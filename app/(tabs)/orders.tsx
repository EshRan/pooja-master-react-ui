
import { useOrders } from '@/context/OrdersContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrdersScreen() {
  const { orders } = useOrders();
  const router = useRouter();

  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Ionicons name="receipt-outline" size={80} color="#ddd" />
        <Text style={styles.emptyTitle}>No Orders Yet</Text>
        <Text style={styles.emptySubtitle}>Looks like you haven't placed any orders yet.</Text>
        <TouchableOpacity style={styles.shopNowButton} onPress={() => router.push('/(tabs)/Home')}>
          <Text style={styles.shopNowText}>Start Shopping</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Order ID: {item.id}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>
            <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>

            <View style={styles.divider} />

            <View style={styles.itemsPreview}>
              {item.items.slice(0, 3).map((cartItem, idx) => (
                <Text key={idx} style={styles.itemText} numberOfLines={1}>
                  • {cartItem.title} x {cartItem.quantity}
                </Text>
              ))}
              {item.items.length > 3 && (
                <Text style={styles.moreText}>+ {item.items.length - 3} more items</Text>
              )}
            </View>

            <View style={styles.divider} />

            <View style={styles.footer}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>₹{item.totalAmount}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f4',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#212121',
  },
  emptySubtitle: {
    marginTop: 8,
    color: '#878787',
    textAlign: 'center',
    marginBottom: 24,
  },
  shopNowButton: {
    backgroundColor: '#D9945D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
  },
  shopNowText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orderCard: {
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontWeight: 'bold',
    color: '#333',
  },
  status: {
    color: '#388E3C', // Green
    fontWeight: 'bold',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    overflow: 'hidden',
  },
  date: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 12,
  },
  itemsPreview: {
    marginBottom: 8,
  },
  itemText: {
    color: '#555',
    marginBottom: 4,
  },
  moreText: {
    color: '#999',
    fontSize: 12,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: '#666',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
});