import { Image, ImageStyle } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MediaRendererProps {
    imageUrl?: string;
    videoUrl?: string | number | null; // Allow require() number
    posterUrl?: string;
    style?: ImageStyle | any;
    contentFit?: 'cover' | 'contain' | 'fill';
    showWatermark?: boolean;
}

const MediaRenderer: React.FC<MediaRendererProps> = ({
    imageUrl,
    videoUrl,
    posterUrl,
    style,
    contentFit = 'cover',
    showWatermark = false
}) => {
    // Create a stable source object
    let videoSource: any = null;
    if (typeof videoUrl === 'string') {
        videoSource = { uri: videoUrl };
    } else if (typeof videoUrl === 'number') {
        videoSource = videoUrl; // Handles require()
    }

    const player = useVideoPlayer(videoSource, player => {
        if (player) {
            player.loop = true;
            player.muted = true;
            player.play();
        }
    });

    if (videoUrl) {
        return (
            <View style={[styles.container, style]}>
                <VideoView
                    style={StyleSheet.absoluteFill}
                    player={player}
                    allowsFullscreen={false}
                    allowsPictureInPicture={false}
                    contentFit={contentFit}
                    nativeControls={false}
                />
                {showWatermark && <Watermark />}
            </View>
        );
    }

    return (
        <View style={[styles.container, style]}>
            <Image
                source={imageUrl ? { uri: imageUrl } : require('../assets/images/logo.png')} // Fallback
                style={StyleSheet.absoluteFill}
                contentFit={contentFit}
                transition={200}
            />
            {showWatermark && <Watermark />}
        </View>
    );
};

const Watermark = () => (
    <View style={styles.watermarkContainer}>
        <Image
            source={require('../assets/images/logo_without_name.png')}
            style={styles.watermarkLogo}
            contentFit="contain"
        />
        <Text style={styles.watermarkText}>Pooja Master</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    watermarkContainer: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.7,
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 4,
        borderRadius: 4,
    },
    watermarkLogo: {
        width: 20,
        height: 20,
        marginRight: 6,
    },
    watermarkText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    }
});

export default MediaRenderer;
