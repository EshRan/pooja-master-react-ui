
import { ProductCard } from '@/components/ProductCard';
import { ApiService } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ListingScreen() {
    const { type, id, title } = useLocalSearchParams();
    const router = useRouter();
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [type, id]);

    const fetchData = async () => {
        try {
            setLoading(true);
            if (type === 'occasion') {
                const occasionId = id as string;

                // User expects to see the actual items for this occasion!
                const mappings = await ApiService.getAllMappings();
                const occasionMappings = mappings.filter((m: any) => m.occasion?.id?.toString() === occasionId);

                const items = occasionMappings.map((m: any) => ({
                    id: m.poojaItem?.id?.toString() || m.poojaItem?.itemName,
                    title: m.poojaItem?.itemName,
                    price: m.poojaItem?.price || m.poojaItem?.estimatedPrice || 0,
                    image: ApiService.getImageUrl(m.poojaItem?.s3ImageKey || m.poojaItem?.imageUrl) || 'https://via.placeholder.com/150',
                    description: m.poojaItem?.description,
                    quantityUnit: m.poojaItem?.quantityUnit || 'piece',
                    isInStock: m.poojaItem?.isInStock !== false
                })).filter((i: any) => i.title); // Filter out any empty/invalid items

                setData(items);
            } else if (type === 'items') {
                const items = await ApiService.getPoojaItems();

                const pItems = items.map((i: any) => ({
                    id: i.id.toString(),
                    title: i.itemName,
                    price: i.price || i.estimatedPrice || 100,
                    image: ApiService.getImageUrl(i.s3ImageKey || i.imageUrl || i.image) || 'https://via.placeholder.com/150',
                    description: i.description,
                    quantityUnit: i.quantityUnit || 'piece',
                    isInStock: i.isInStock !== false
                }));
                setData(pItems);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>

            {loading ? (
                <View style={styles.emptyContainer}>
                    <ActivityIndicator size="large" color="#FF9933" />
                </View>
            ) : data.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text>No items found for this category.</Text>
                </View>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <View style={styles.itemWrapper}>
                            <ProductCard
                                item={item}
                                onPress={() => router.push({
                                    pathname: "/product/[id]",
                                    params: {
                                        id: item.id,
                                        type: 'item',
                                        title: item.title,
                                        price: item.price,
                                        image: item.image,
                                        description: item.description,
                                        quantityUnit: item.quantityUnit
                                    }
                                } as any)}
                            />
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f2f4',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121',
    },
    listContent: {
        padding: 8,
    },
    itemWrapper: {
        width: '50%',
        padding: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
