
import { ProductCard } from '@/components/ProductCard';
import { items } from '@/data/items';
import { kits } from '@/data/kits';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ListingScreen() {
    const { type, id, title } = useLocalSearchParams();
    const router = useRouter();
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        if (type === 'occasion') {
            // Filter kits by occasion ID
            const filteredKits = kits.filter(k => k.categoryId === id);
            // Also could include items relevant to occasion if we had that mapping
            setData(filteredKits);
        } else if (type === 'items') {
            setData(items);
        }
    }, [type, id]);

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>

            {data.length === 0 ? (
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
                                onPress={() => router.push({ pathname: "/product/[id]", params: { id: item.id } } as any)}
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
