
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';

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
    };

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" transition={200} />
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
                        <Ionicons name="star" size={10} color="#fff" />
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#f0f0f0',
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
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 12,
        padding: 4,
    },
    details: {
        padding: 8,
    },
    title: {
        fontSize: 14,
        color: '#212121',
        lineHeight: 18,
        marginBottom: 4,
    },
    ratingContainer: {
        backgroundColor: '#388E3C',
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
        borderColor: '#D9945D',
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
    },
    addButtonText: {
        color: '#D9945D',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
