
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const renderOption = (icon: any, title: string, subtitle?: string, onPress?: () => void) => (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <View style={styles.optionIconContainer}>
        {icon}
      </View>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          <Image
            source={profileImage ? { uri: profileImage } : require('@/assets/images/logo_without_name.png')}
            style={styles.logo}
          />
          <View style={styles.editIcon}>
            <Ionicons name="camera" size={12} color="#fff" />
          </View>
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Hello,</Text>
          <Text style={styles.userName}>Charan Teja</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Account Settings</Text>
          {renderOption(
            <Ionicons name="location-outline" size={24} color="#FF9933" />,
            "Saved Addresses",
            "Manage your delivery addresses",
            () => router.push('/address')
          )}
          {renderOption(
            <Ionicons name="card-outline" size={24} color="#FF9933" />,
            "Payment Methods",
            "Manage your saved cards and UPI",
            () => router.push('/payment')
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>My Activity</Text>
          {renderOption(
            <Ionicons name="receipt-outline" size={24} color="#FF9933" />,
            "My Orders",
            "View order status and history",
            () => router.push('/(tabs)/orders')
          )}
          {renderOption(
            <Ionicons name="heart-outline" size={24} color="#FF9933" />,
            "Wishlist",
            "Your saved items",
            () => { }
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Feedback & Information</Text>
          {renderOption(
            <MaterialIcons name="support-agent" size={24} color="#FF9933" />,
            "Help & Support",
            "FAQs and Customer Care",
            () => { }
          )}
          {renderOption(
            <Ionicons name="log-out-outline" size={24} color="#FF9933" />,
            "Logout",
            "",
            () => router.replace('/Login')
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#FFD700', // Gold border
  },
  imageContainer: {
    marginRight: 16,
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF9933',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  userInfo: {
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  section: {
    marginTop: 10,
    borderBottomWidth: 8,
    borderBottomColor: '#f8f8f8',
    paddingBottom: 8,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#878787',
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  optionIconContainer: {
    marginRight: 16,
    width: 24,
    alignItems: 'center',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: '#212121',
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
});