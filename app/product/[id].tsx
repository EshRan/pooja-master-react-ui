
import MediaRenderer from '@/components/MediaRenderer';
import { DropdownOption, VariantDropdown } from '@/components/VariantDropdown';
import { useCart } from '@/context/CartContext';
import { ApiService } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const generateVariants = (unit: string = 'piece', basePrice: number): DropdownOption[] => {
    const formattedUnit = unit.toLowerCase();
    if (formattedUnit.includes('gm') || formattedUnit.includes('gram')) {
        return [
            { label: '250 gms', value: '250g', price: basePrice },
            { label: '500 gms', value: '500g', price: basePrice * 2 },
            { label: '1 Kg', value: '1kg', price: basePrice * 4 }
        ];
    } else if (formattedUnit.includes('ml') || formattedUnit.includes('liter') || formattedUnit.includes('lt')) {
        return [
            { label: '250 ml', value: '250ml', price: basePrice },
            { label: '500 ml', value: '500ml', price: basePrice * 2 },
            { label: '1 Lt', value: '1lt', price: basePrice * 4 }
        ];
    } else {
        return [
            { label: '1 Piece', value: '1pc', price: basePrice },
            { label: '2 Pieces', value: '2pc', price: basePrice * 2 },
            { label: '5 Pieces', value: '5pc', price: basePrice * 5 }
        ];
    }
};

export default function ProductDetailsScreen() {
    const { id, type } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState<DropdownOption | null>(null);

    // Using simple derived state for variants so it stays in sync with product loading
    const variants = useMemo(() => {
        if (!product || product.type === 'kit' || product.type === 'occasion' || product.itemsIncluded) return [];
        return generateVariants(product.quantityUnit, product.basePrice || product.price);
    }, [product]);

    useEffect(() => {
        if (variants.length > 0 && !selectedVariant) {
            setSelectedVariant(variants[0]);
        }
    }, [variants]);

    useEffect(() => {
        fetchProductDetails();
    }, [id, type]);

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            let data;
            if (type === 'kit' || type === 'occasion') {
                data = await ApiService.getKitDetails(id as string);
                // Transform if needed. data might be Occasion object.
                // If it is Occasion:
                if (data && (data.occasionName || data.type)) {
                    data = {
                        id: data.id.toString(),
                        title: data.occasionName || data.title,
                        price: data.price || 0,
                        image: ApiService.getImageUrl(data.s3ImageKey || data.imageUrl),
                        video: data.videoUrl, // Add video support
                        description: data.description,
                        rating: 4.8, // Mock
                        itemsIncluded: [] // Backend doesn't give items yet, or we need another call
                    };
                }
            } else {
                data = await ApiService.getItemDetails(id as string);
                if (data && data.itemName) {
                    data = {
                        id: data.id.toString(),
                        title: data.itemName,
                        basePrice: data.price || data.estimatedPrice || 100, // Store base price for variant calculations
                        price: data.price || data.estimatedPrice || 100,
                        image: ApiService.getImageUrl(data.s3ImageKey || data.imageUrl),
                        description: data.description,
                        quantityUnit: data.quantityUnit || 'piece',
                        isInStock: data.isInStock !== false,
                        rating: 4.5
                    };
                }
            }
            setProduct(data);
        } catch (e) {
            console.error("Failed to fetch product", e);
        } finally {
            setLoading(false);
        }
    };

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
                    <MediaRenderer
                        imageUrl={product.image}
                        videoUrl={product.video}
                        style={styles.image}
                        contentFit="cover"
                        showWatermark={!!product.video}
                    />
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

                    {!product.itemsIncluded && variants.length > 0 && selectedVariant && (
                        <View style={{ marginTop: 12, marginBottom: 4 }}>
                            <Text style={styles.sectionTitle}>Select Quantity</Text>
                            <VariantDropdown
                                options={variants}
                                selectedValue={selectedVariant.value}
                                onSelect={setSelectedVariant}
                                disabled={product.isInStock === false}
                            />
                        </View>
                    )}

                    <Text style={styles.price}>
                        ₹{selectedVariant ? selectedVariant.price : product.price}
                    </Text>

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
                    style={[styles.cartBtn, product.isInStock === false && { opacity: 0.5 }]}
                    disabled={product.isInStock === false}
                    onPress={() => {
                        const itemToAdd = {
                            ...product,
                            id: selectedVariant ? `${product.id}-${selectedVariant.value}` : product.id,
                            price: selectedVariant ? selectedVariant.price : product.price,
                            quantity: 1,
                            variantLabel: selectedVariant ? selectedVariant.label : undefined
                        };
                        addToCart(itemToAdd);
                        // Optional: Show toast
                    }}
                >
                    <Text style={styles.cartBtnText}>{product.isInStock === false ? 'UNAVAILABLE' : 'ADD TO CART'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.buyBtn, product.isInStock === false && { opacity: 0.5 }]}
                    disabled={product.isInStock === false}
                    onPress={() => {
                        const itemToAdd = {
                            ...product,
                            id: selectedVariant ? `${product.id}-${selectedVariant.value}` : product.id,
                            price: selectedVariant ? selectedVariant.price : product.price,
                            quantity: 1,
                            variantLabel: selectedVariant ? selectedVariant.label : undefined
                        };
                        addToCart(itemToAdd);
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
