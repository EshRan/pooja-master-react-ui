
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';
import MediaRenderer from './MediaRenderer'; // Import customized renderer
import { DropdownOption, VariantDropdown } from './VariantDropdown';

export interface ProductVariant extends DropdownOption { }

interface ProductCardProps {
    item: {
        id: string;
        title: string;
        price: number;
        image: string;
        rating?: number;
        description?: string;
        quantityUnit?: string;
        isInStock?: boolean;
        stockInQuantity?: number;
        totalQuantity?: number;
    };
    onPress: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24;

const generateVariants = (unit: string = 'piece', basePrice: number, stock: number = 10, totalQuantity: number = 1): ProductVariant[] => {
    const formattedUnit = unit.toLowerCase();

    // Capitalize unit name for display
    const unitName = formattedUnit.charAt(0).toUpperCase() + formattedUnit.slice(1);

    if (formattedUnit.includes('gm') || formattedUnit.includes('gram') || formattedUnit.includes('kg')) {
        const isKg = formattedUnit.includes('kg');
        const quantityInGrams = (totalQuantity > 0 ? totalQuantity : 1) * (isKg ? 1000 : 1);
        const perGramPrice = basePrice / quantityInGrams;
        return [
            { label: '250 gms', value: '250g', price: Math.round(perGramPrice * 250) },
            { label: '500 gms', value: '500g', price: Math.round(perGramPrice * 500) },
            { label: '1 Kg', value: '1kg', price: Math.round(perGramPrice * 1000) }
        ];
    } else if (formattedUnit.includes('ml') || formattedUnit.includes('liter') || formattedUnit.includes('lt')) {
        const isLiter = formattedUnit.includes('liter') || formattedUnit.includes('lt');
        const quantityInMl = (totalQuantity > 0 ? totalQuantity : 1) * (isLiter ? 1000 : 1);
        const perMlPrice = basePrice / quantityInMl;
        return [
            { label: '250 ml', value: '250ml', price: Math.round(perMlPrice * 250) },
            { label: '500 ml', value: '500ml', price: Math.round(perMlPrice * 500) },
            { label: '1 Lt', value: '1lt', price: Math.round(perMlPrice * 1000) }
        ];
    } else {
        // Dynamic based on piece/packet/dozen etc.
        const variants: ProductVariant[] = [];

        // Define realistic thresholds
        const thresholds = [1, 2, 5, 10, 20];
        const unitPrice = basePrice / (totalQuantity > 0 ? totalQuantity : 1);

        for (const qty of thresholds) {
            if (qty <= stock || qty === 1) { // Always show at least 1 option if in stock
                variants.push({
                    label: `${qty} ${qty > 1 ? (unitName.endsWith('s') ? unitName : unitName + 's') : unitName}`,
                    value: `${qty}${formattedUnit}`,
                    price: Math.round(unitPrice * qty)
                });
            }
        }

        // Ensure at least one variant is returned if stock is 0 but it wasn't flagged out of stock
        if (variants.length === 0) {
            variants.push({
                label: `1 ${unitName}`,
                value: `1${formattedUnit}`,
                price: Math.round(unitPrice)
            });
        }

        return variants;
    }
};

export const ProductCard: React.FC<ProductCardProps> = ({ item, onPress }) => {
    const { addToCart } = useCart();

    const variants = useMemo(() => generateVariants(item.quantityUnit, item.price, item.stockInQuantity, item.totalQuantity), [item.quantityUnit, item.price, item.stockInQuantity, item.totalQuantity]);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(variants[0]);

    const handleAddToCart = () => {
        addToCart({
            ...item,
            id: `${item.id}-${selectedVariant.value}`,
            price: selectedVariant.price || item.price,
            quantity: 1,
            variantLabel: selectedVariant.label
        });
        Alert.alert("Added to Cart", `${item.title} (${selectedVariant.label}) has been added to your cart.`);
    };

    const isOutOfStock = item.isInStock === false;

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={[styles.container, isOutOfStock && { opacity: 0.7 }]}>
            <View style={styles.imageContainer}>
                {/* Use MediaRenderer to support Images and optional Videos */}
                <MediaRenderer
                    imageUrl={item.image}
                    contentFit="cover"
                    style={styles.image}
                />
                <TouchableOpacity style={styles.wishlistInfo}>
                    <Ionicons name="heart-outline" size={20} color="#666" />
                </TouchableOpacity>
                {isOutOfStock && (
                    <View style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(255,255,255,0.6)', justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{ color: '#D32F2F', fontWeight: 'bold' }}>Out of Stock</Text>
                    </View>
                )}
            </View>

            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>

                {item.rating && (
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>{item.rating}</Text>
                        <Ionicons name="star" size={10} color="#FFD700" />
                    </View>
                )}

                <View style={{ marginBottom: 8 }}>
                    <VariantDropdown
                        options={variants}
                        selectedValue={selectedVariant.value}
                        onSelect={setSelectedVariant}
                        disabled={isOutOfStock}
                    />
                </View>

                <View style={styles.priceRow}>
                    <Text style={styles.price}>₹{selectedVariant.price}</Text>
                    <TouchableOpacity
                        onPress={handleAddToCart}
                        style={[styles.addButton, isOutOfStock && { borderColor: '#ccc', backgroundColor: '#f0f0f0' }]}
                        disabled={isOutOfStock}
                    >
                        <Text style={[styles.addButtonText, isOutOfStock && { color: '#999' }]}>
                            {isOutOfStock ? 'UNAVAILABLE' : 'ADD'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#DAA520', // Gold shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E6D7C3', // Creamy border
    },
    imageContainer: {
        height: CARD_WIDTH,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    wishlistInfo: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 12,
        padding: 4,
    },
    details: {
        padding: 8,
    },
    title: {
        fontSize: 14,
        color: '#4A3B2A', // Spiritual Brown
        lineHeight: 18,
        marginBottom: 4,
        fontWeight: '500',
    },
    ratingContainer: {
        backgroundColor: '#800000', // Maroon background for rating
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginBottom: 6,
    },
    ratingText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        marginRight: 2,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121',
    },
    addButton: {
        borderColor: '#FF9933',
        backgroundColor: '#FFF8F0',
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
    },
    addButtonText: {
        color: '#FF9933', // Saffron Text
        fontSize: 12,
        fontWeight: 'bold',
    },
});
