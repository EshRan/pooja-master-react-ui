
import MediaRenderer from '@/components/MediaRenderer';
import { DropdownOption, VariantDropdown } from '@/components/VariantDropdown';
import { useCart } from '@/context/CartContext';
import { ApiService } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
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

    const totalKitPrice = useMemo(() => {
        if (product?.itemsIncluded && product.itemsIncluded.length > 0) {
            return product.itemsIncluded.reduce((sum: number, item: any) => {
                return sum + (item.selected ? (item.price * item.quantity) : 0);
            }, 0);
        }
        return product?.price || 0;
    }, [product]);

    const toggleKitItem = (itemId: string) => {
        setProduct((prev: any) => {
            if (!prev || !prev.itemsIncluded) return prev;
            return {
                ...prev,
                itemsIncluded: prev.itemsIncluded.map((item: any) =>
                    item.id === itemId ? { ...item, selected: !item.selected } : item
                )
            };
        });
    };

    const updateKitItemQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setProduct((prev: any) => {
            if (!prev || !prev.itemsIncluded) return prev;
            return {
                ...prev,
                itemsIncluded: prev.itemsIncluded.map((item: any) =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                )
            };
        });
    };

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
                    const mappings = await ApiService.getAllMappings();
                    const occasionMappings = mappings.filter((m: any) => m.occasion?.id?.toString() === id);
                    const includedItems = occasionMappings
                        .map((m: any) => ({
                            id: m.poojaItem?.id?.toString() || m.poojaItem?.itemName,
                            name: m.poojaItem?.itemName,
                            price: m.poojaItem?.price || m.poojaItem?.estimatedPrice || 0,
                            image: ApiService.getImageUrl(m.poojaItem?.s3ImageKey || m.poojaItem?.imageUrl) || 'https://via.placeholder.com/150',
                            quantity: 1,
                            quantityUnit: m.poojaItem?.quantityUnit || 'pc',
                            selected: true
                        }))
                        .filter((i: any) => i.name);

                    data = {
                        id: data.id.toString(),
                        title: data.occasionName || data.title,
                        price: data.price || 0,
                        image: ApiService.getImageUrl(data.s3ImageKey || data.imageUrl),
                        video: data.videoUrl, // Add video support
                        description: data.description,
                        rating: 4.8, // Mock
                        itemsIncluded: includedItems.length > 0 ? includedItems : null
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
                        ₹{selectedVariant ? selectedVariant.price : (product.itemsIncluded ? totalKitPrice : product.price)}
                    </Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    {product.itemsIncluded && (
                        <>
                            <View style={styles.divider} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                <Text style={styles.sectionTitle}>In The Box</Text>
                                <TouchableOpacity onPress={() => router.push('/listing/items?title=Pooja Items' as any)}>
                                    <Text style={{ color: '#D9945D', fontWeight: 'bold', fontSize: 14 }}>+ Add More Items</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.itemList}>
                                {product.itemsIncluded.map((item: any, index: number) => (
                                    <View key={item.id || index} style={styles.kitItemCard}>
                                        <TouchableOpacity onPress={() => toggleKitItem(item.id)} style={{ marginRight: 10 }}>
                                            <Ionicons name={item.selected ? 'checkbox' : 'square-outline'} size={24} color="#D9945D" />
                                        </TouchableOpacity>
                                        <Image source={{ uri: item.image }} style={styles.kitItemImage} />
                                        <View style={styles.kitItemDetails}>
                                            <Text style={styles.kitItemName} numberOfLines={2}>{item.name}</Text>
                                            <Text style={styles.kitItemPrice}>₹{item.price} • {item.quantityUnit}</Text>
                                        </View>

                                        {item.selected && (
                                            <View style={styles.kitItemQuantityControl}>
                                                <TouchableOpacity style={styles.kitItemQtyBtn} onPress={() => updateKitItemQuantity(item.id, item.quantity - 1)}>
                                                    <Text style={styles.kitItemQtyText}>-</Text>
                                                </TouchableOpacity>
                                                <Text style={styles.kitItemQtyValue}>{item.quantity}</Text>
                                                <TouchableOpacity style={styles.kitItemQtyBtn} onPress={() => updateKitItemQuantity(item.id, item.quantity + 1)}>
                                                    <Text style={styles.kitItemQtyText}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                ))}
                            </View>
                            <TouchableOpacity
                                style={styles.addMoreButton}
                                onPress={() => router.push('/listing/items?title=Pooja Items' as any)}
                            >
                                <Ionicons name="add-circle-outline" size={20} color="#D9945D" />
                                <Text style={styles.addMoreButtonText}>Add any other pooja items</Text>
                            </TouchableOpacity>
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
                            price: selectedVariant ? selectedVariant.price : (product.itemsIncluded ? totalKitPrice : product.price),
                            quantity: 1,
                            variantLabel: selectedVariant ? selectedVariant.label : undefined,
                            itemsIncluded: product.itemsIncluded ? product.itemsIncluded.filter((i: any) => i.selected) : undefined
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
                            price: selectedVariant ? selectedVariant.price : (product.itemsIncluded ? totalKitPrice : product.price),
                            quantity: 1,
                            variantLabel: selectedVariant ? selectedVariant.label : undefined,
                            itemsIncluded: product.itemsIncluded ? product.itemsIncluded.filter((i: any) => i.selected) : undefined
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
    kitItemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 8,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    kitItemImage: {
        width: 40,
        height: 40,
        borderRadius: 4,
        marginRight: 12,
        backgroundColor: '#fff',
    },
    kitItemDetails: {
        flex: 1,
    },
    kitItemName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#212121',
    },
    kitItemPrice: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    kitItemQuantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    kitItemQtyBtn: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    kitItemQtyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    kitItemQtyValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#212121',
        paddingHorizontal: 8,
    },
    addMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginTop: 8,
        backgroundColor: '#FFF8F0',
        borderWidth: 1,
        borderColor: '#E6D7C3',
        borderRadius: 8,
        borderStyle: 'dashed',
    },
    addMoreButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#D9945D',
        marginLeft: 8,
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
