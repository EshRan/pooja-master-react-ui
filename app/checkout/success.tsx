
import { useOrders } from '@/context/OrdersContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderSuccessScreen() {
    const router = useRouter();
    const { orders } = useOrders();
    const latestOrder = orders[0]; // Assuming the latest order is at index 0

    useEffect(() => {
        // Prevent going back to payment screen
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            router.replace('/(tabs)/Home');
            return true;
        });

        return () => backHandler.remove();
    }, [router]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons name="checkmark-circle" size={100} color="#388E3C" />
                </View>
                <Text style={styles.successTitle}>Order Placed Successfully!</Text>

                {latestOrder && (
                    <Text style={styles.orderId}>Order ID: {latestOrder.id}</Text>
                )}

                <Text style={styles.message}>
                    Thank you for shopping with us. Your pooja items will be delivered soon.
                </Text>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.ordersButton}
                        onPress={() => router.replace('/(tabs)/orders')}
                    >
                        <Text style={styles.ordersButtonText}>View Order</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.homeButton}
                        onPress={() => router.replace('/(tabs)/Home')}
                    >
                        <Text style={styles.homeButtonText}>Continue Shopping</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    iconContainer: {
        marginBottom: 24,
    },
    successTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#212121',
        textAlign: 'center',
        marginBottom: 8,
    },
    orderId: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
        fontWeight: 'bold',
    },
    message: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        marginBottom: 48,
        lineHeight: 24,
    },
    actions: {
        width: '100%',
    },
    ordersButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#D9945D',
        paddingVertical: 14,
        borderRadius: 4,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
    },
    ordersButtonText: {
        color: '#D9945D',
        fontWeight: 'bold',
        fontSize: 16,
    },
    homeButton: {
        backgroundColor: '#D9945D',
        paddingVertical: 14,
        borderRadius: 4,
        width: '100%',
        alignItems: 'center',
    },
    homeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
