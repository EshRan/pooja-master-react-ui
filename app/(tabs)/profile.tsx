
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();

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
        <Image source={require('@/assets/images/logo_without_name.png')} style={styles.logo} />
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Hello,</Text>
          <Text style={styles.userName}>Charan Teja</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Account Settings</Text>
          {renderOption(
            <Ionicons name="location-outline" size={24} color="#D9945D" />,
            "Saved Addresses",
            "Manage your delivery addresses",
            () => router.push('/checkout/address') // Reusing address list for now, ideally separate
          )}
          {renderOption(
            <Ionicons name="card-outline" size={24} color="#D9945D" />,
            "Payment Methods",
            "Manage your saved cards and UPI",
            () => { }
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>My Activity</Text>
          {renderOption(
            <Ionicons name="receipt-outline" size={24} color="#D9945D" />,
            "My Orders",
            "View order status and history",
            () => router.push('/(tabs)/orders')
          )}
          {renderOption(
            <Ionicons name="heart-outline" size={24} color="#D9945D" />,
            "Wishlist",
            "Your saved items",
            () => { }
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Feedback & Information</Text>
          {renderOption(
            <MaterialIcons name="support-agent" size={24} color="#D9945D" />,
            "Help & Support",
            "FAQs and Customer Care",
            () => { }
          )}
          {renderOption(
            <Ionicons name="log-out-outline" size={24} color="#D9945D" />,
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
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#eee',
    resizeMode: 'contain',
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