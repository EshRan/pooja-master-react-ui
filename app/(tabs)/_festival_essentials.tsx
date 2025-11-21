import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const _festival_essentials = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/homeIcons/kalasha.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Festive Essentials</Text>
      <Text style={styles.subtitle}>Items for Sankranthi, Deepavali, Ugadi...</Text>
    </View>
  );
};

export default _festival_essentials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 16,
    marginVertical: 20
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center'
  }
});
