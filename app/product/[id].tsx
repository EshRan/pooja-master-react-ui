
import { useCart } from '@/context/CartContext';
import { items } from '@/data/items';
import { kits } from '@/data/kits';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        // Find in kits or items
        const foundKit = kits.find(k => k.id === id);
        if (foundKit) {
            setProduct(foundKit);
        } else {
            const foundItem = items.find(i => i.id === id);
            setProduct(foundItem);
        }
    }, [id]);

    if (!product) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image }} style={styles.image} contentFit="cover" transition={200} />
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{product.title}</Text>
                    {product.rating && (
                        <View style={styles.ratingRow}>
                            <View style={styles.ratingBadge}>
                                <Text style={styles.ratingText}>{product.rating}</Text>
                                <Ionicons name="star" size={10} color="#fff" />
                            </View>
                            <Text style={styles.ratingCount}> (124 ratings)</Text>
                        </View>
                    )}

                    <Text style={styles.price}>₹{product.price}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    {product.itemsIncluded && (
                        <>
                            <View style={styles.divider} />
                            <Text style={styles.sectionTitle}>In The Box</Text>
                            <View style={styles.itemList}>
                                {product.itemsIncluded.map((item: string, index: number) => (
                                    <Text key={index} style={styles.listItem}>• {item}</Text>
                                ))}
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.cartBtn}
                    onPress={() => {
                        addToCart({ ...product, quantity: 1 });
                        // Optional: Show toast
                    }}
                >
                    <Text style={styles.cartBtnText}>ADD TO CART</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buyBtn}
                    onPress={() => {
                        addToCart({ ...product, quantity: 1 });
                        router.push('/(tabs)/cart');
                    }}
                >
                    <Text style={styles.buyBtnText}>BUY NOW</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: width,
        height: width, // Square image
        backgroundColor: '#f9f9f9',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 16,
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    detailsContainer: {
        padding: 16,
        paddingBottom: 80,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212121',
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    ratingBadge: {
        backgroundColor: '#388E3C',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
    },
    ratingText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
        marginRight: 4,
    },
    ratingCount: {
        color: '#878787',
        fontSize: 14,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#212121',
        marginBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        lineHeight: 22,
        color: '#555',
    },
    itemList: {
        marginTop: 8,
    },
    listItem: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
        lineHeight: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    cartBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    cartBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121',
    },
    buyBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D9945D',
    },
    buyBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
