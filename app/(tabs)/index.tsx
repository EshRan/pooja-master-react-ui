import { useRouter } from 'expo-router';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('@/assets/images/homeIcons/home_bar.png')} 
      style={styles.bg}
      imageStyle={{ opacity: 0.6 }} 
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => router.push('/(tabs)/_festival_essentials')}
        >
          <Text style={styles.tabText}>Festival</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  tabButton: {
    width: 220,
    paddingVertical: 15,
    backgroundColor: 'rgba(255,255,255,0.7)', // transparent white button
    borderRadius: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
