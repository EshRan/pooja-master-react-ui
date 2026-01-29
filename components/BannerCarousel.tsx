
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = 180;

const banners = [
    'https://images.unsplash.com/photo-1513278974582-dc5530397529', // Diwali
    'https://images.unsplash.com/photo-1628151015968-3a4429e9ef04', // Varalakshmi
    'https://images.unsplash.com/photo-1630141680516-e4231b467ec6', // Ganesh
];

export const BannerCarousel: React.FC = () => {
    const [active, setActive] = useState(0);

    // Simple auto-scroll simulation logic could go here, but for basic implementation we leave it static or manual scroll
    // For a true carousel, often libraries are used, but we'll stick to horizontal ScrollView for simplicity.

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => {
                    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
                    if (slide !== active) {
                        setActive(slide);
                    }
                }}
                scrollEventThrottle={16}
            >
                {banners.map((banner, index) => (
                    <Image
                        key={index}
                        source={{ uri: banner }}
                        style={styles.image}
                        contentFit="cover"
                        transition={500}
                    />
                ))}
            </ScrollView>
            <View style={styles.pagination}>
                {banners.map((_, index) => (
                    <View
                        key={index}
                        style={[styles.dot, active === index ? styles.activeDot : null]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: BANNER_HEIGHT,
        width: width,
        marginBottom: 16,
    },
    image: {
        width: width,
        height: BANNER_HEIGHT,
    },
    pagination: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#fff',
        width: 10,
        height: 10,
    },
});
