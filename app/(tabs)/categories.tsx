
import { ApiService } from '@/services/api';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CategoriesScreen() {
    const router = useRouter();
    const [occasions, setOccasions] = useState<any[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const all = await ApiService.getOccasions();
            // Transform all occasions with standard parameters needed by the UI
            const formatted = all.map((o: any) => ({
                id: o.id.toString(),
                title: o.occasionName || o.title,
                image: ApiService.getImageUrl(o.s3ImageKey || o.imageUrl) || 'https://via.placeholder.com/150',
                category: o.category || 'OTHER'
            }));
            setOccasions(formatted);
        } catch (error) {
            console.error("Failed to fetch occasions for categories", error);
        }
    };

    const renderSection = (title: string, data: any[]) => {
        if (!data || data.length === 0) return null;

        // Capitalize first letter of category for nice display
        const displayTitle = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase() + ' Occasions';

        return (
            <View style={styles.section} key={title}>
                <Text style={styles.sectionTitle}>{displayTitle}</Text>
                <View style={styles.grid}>
                    {data.map((item, index) => (
                        <TouchableOpacity
                            key={item.id || index}
                            style={styles.card}
                            onPress={() => router.push({ pathname: "/listing/[type]", params: { type: 'occasion', id: item.id, title: item.title } } as any)}
                        >
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" transition={200} />
                            </View>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    // Get unique categories handling potential undefined/null values
    const uniqueCategories = Array.from(new Set(occasions.map(o => o.category).filter(Boolean)));

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>All Categories</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {uniqueCategories.map(category => {
                    const categoryData = occasions.filter(o => o.category === category);
                    return renderSection(category as string, categoryData);
                })}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Individual Items</Text>
                    <TouchableOpacity
                        style={styles.fullWidthCard}
                        onPress={() => router.push({ pathname: "/listing/[type]", params: { type: 'items', title: 'Pooja Essentials' } } as any)}
                    >
                        <Text style={styles.fullWidthCardText}>Browse All Pooja Essentials</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121',
    },
    section: {
        backgroundColor: '#fff',
        marginTop: 8,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121',
        marginBottom: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '31%',
        marginBottom: 16,
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    cardTitle: {
        fontSize: 12,
        textAlign: 'center',
        color: '#555',
    },
    fullWidthCard: {
        backgroundColor: '#FFF8F0',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D9945D',
    },
    fullWidthCardText: {
        color: '#D9945D',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
