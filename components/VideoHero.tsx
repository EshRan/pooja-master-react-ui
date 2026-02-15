import { useVideoPlayer, VideoView } from 'expo-video';
import { Image, StyleSheet, Text, View } from 'react-native';

// Placeholder video for now since we don't have the actual generated asset yet.
// Using a reliable sample video URL.
// Local video asset
const VIDEO_SOURCE = require('../assets/videos/hero_video.mp4');

export default function VideoHero() {
    const player = useVideoPlayer(VIDEO_SOURCE, player => {
        if (player) {
            player.loop = true;
            player.muted = true;
            player.play();
        }
    });

    return (
        <View style={styles.container}>
            <VideoView
                style={styles.video}
                player={player}
                allowsFullscreen={false} // Keeping for now as removing it requires checking new API
                allowsPictureInPicture={false}
                contentFit="cover"
            />

            {/* Overlay Gradient/Tint could go here */}
            <View style={styles.overlay} />

            {/* Watermark Logo */}
            <View style={styles.watermarkContainer}>
                <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.watermarkText}>Pooja Master</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 350, // Increased height, full width
        backgroundColor: '#000',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 12,
        marginBottom: 20,
    },
    video: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.1)', // Subtle overlay
    },
    watermarkContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.8,
    },
    logo: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    watermarkText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});
