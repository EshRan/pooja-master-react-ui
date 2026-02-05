
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
                // For now, fetching all kits (assuming kits are occasions for now or we filter occasions)
                // If we had a direct getKits API, we'd use it.
                // Assuming 'id' passed here is category/occasion id.
                const allOccasions = await ApiService.getOccasions();
                // Filter logic: match ID or Type? 
                // If `id` is "marriage", we filter by type. If `id` is specific occasion ID, we show items IN that occasion?
                // The previous code `kits.filter(k => k.categoryId === id)` suggests filtering kits by category.

                // Let's assume we want to show Kits (which are mapped to Occasions).
                // We will filter occasions that match the passed `id` (if it's a category)
                // or just show all for demo if ID logic is loose.

                // Better: If type=occasion, we might be showing "Kits for this Occasion". 
                // Since we don't have separate Kit entity, let's treat Occasions as Kits.
                // We can filter by referencing the ID.

                // However, `Home.tsx` passes `id: item.id`.
                const filtered = allOccasions.filter((o: any) => o.id.toString() === id || o.type === id);
                // If empty, maybe show similar? 
                // If we are listing "Kits", maybe we show OTHER occasions too?
                // Let's just fetch all and filter by logic similar to previous mock.

                // If previous mock `kits` had `categoryId`, and we passed `id` (e.g. 'marriage').
                // We can search for occasions with type matching `id` (if id is 'MARRIAGE').

                const res = allOccasions.filter((o: any) =>
                    (typeof id === 'string' && o.type === id.toUpperCase()) ||
                    o.occasionName?.toLowerCase().includes((id as string).toLowerCase()) ||
                    o.id.toString() === id
                ).map((o: any) => ({
                    id: o.id.toString(),
                    title: o.occasionName,
                    image: o.imageUrl || 'https://via.placeholder.com/150',
                    price: o.price || 0,
                    description: o.description
                }));
                setData(res);

            } else if (type === 'items') {
                const items = await ApiService.getPoojaItems();
                // Filter? If `id` is passed?
                // `Home.tsx` passed `pathname: "/listing/[type]", params: { type: 'occasion', id: item.id }` for categories.
                // For "View All" (items), `Home.tsx` assumes `items` type? No, `pathname: '/(tabs)/categories'`.
                // Wait, `ListingScreen` handles `type === 'items'`.

                const pItems = items.map((i: any) => ({
                    id: i.id.toString(),
                    title: i.itemName,
                    price: i.price || i.estimatedPrice || 100,
                    image: i.imageUrl || i.s3ImageKey || 'https://via.placeholder.com/150',
                    rating: 4.5,
                    description: i.description
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
                                onPress={() => router.push({ pathname: "/product/[id]", params: { id: item.id, type: type === 'occasion' ? 'kit' : 'item' } } as any)}
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
