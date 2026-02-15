
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';
import MediaRenderer from './MediaRenderer'; // Import customized renderer

interface ProductCardProps {
    item: {
        id: string;
        title: string;
        price: number;
        image: string;
        rating?: number;
        description?: string;
    };
    onPress: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24;

export const ProductCard: React.FC<ProductCardProps> = ({ item, onPress }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({ ...item, quantity: 1 });
        Alert.alert("Added to Cart", `${item.title} has been added to your cart.`);
    };

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.container}>
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

                <View style={styles.priceRow}>
                    <Text style={styles.price}>₹{item.price}</Text>
                    <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
                        <Text style={styles.addButtonText}>ADD</Text>
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
