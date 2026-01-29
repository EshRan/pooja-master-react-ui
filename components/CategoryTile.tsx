
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CategoryTileProps {
    title: string;
    image: string;
    onPress: () => void;
}

export const CategoryTile: React.FC<CategoryTileProps> = ({ title, image, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} contentFit="cover" transition={200} />
            </View>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 80,
        marginRight: 16,
    },
    imageContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        marginBottom: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
        fontWeight: '500',
    },
});
