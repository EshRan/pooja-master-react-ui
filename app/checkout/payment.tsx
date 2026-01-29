
import { PaymentOptionTile } from '@/components/PaymentOptionTile';
import { PriceSummary } from '@/components/PriceSummary';
import { useAddress } from '@/context/AddressContext';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrdersContext';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CheckoutPaymentScreen() {
    const router = useRouter();
    const { addressId } = useLocalSearchParams();
    const { cart, getTotal, clearCart } = useCart();
    const { addresses } = useAddress();
    const { placeOrder } = useOrders();

    const [selectedPayment, setSelectedPayment] = useState('cod');
    const [isProcessing, setIsProcessing] = useState(false);

    const total = getTotal();
    const deliveryCharge = 50;
    const finalAmount = total + deliveryCharge;

    const handlePlaceOrder = () => {
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            const address = addresses.find(a => a.id === addressId) || addresses[0];
            placeOrder(cart, finalAmount, address, selectedPayment);
            clearCart();
            setIsProcessing(false);
            router.replace('/checkout/success');
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payments</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.sectionHeaderContainer}>
                    <Text style={styles.sectionHeader}>Payment Options</Text>
                </View>

                <PaymentOptionTile
                    id="upi"
                    title="UPI"
                    subtitle="Google Pay, PhonePe, Paytm"
                    icon={<MaterialCommunityIcons name="contactless-payment" size={24} color="#333" />}
                    selected={selectedPayment === 'upi'}
                    onSelect={() => setSelectedPayment('upi')}
                />
                <PaymentOptionTile
                    id="card"
                    title="Credit / Debit / ATM Card"
                    subtitle="Visa, Mastercard, Rupay"
                    icon={<Ionicons name="card-outline" size={24} color="#333" />}
                    selected={selectedPayment === 'card'}
                    onSelect={() => setSelectedPayment('card')}
                />
                <PaymentOptionTile
                    id="netbanking"
                    title="Net Banking"
                    subtitle="All Indian banks"
                    icon={<FontAwesome5 name="university" size={18} color="#333" />}
                    selected={selectedPayment === 'netbanking'}
                    onSelect={() => setSelectedPayment('netbanking')}
                />
                <PaymentOptionTile
                    id="cod"
                    title="Cash on Delivery"
                    subtitle="Pay when you receive the order"
                    icon={<MaterialCommunityIcons name="cash-multiple" size={24} color="#333" />}
                    selected={selectedPayment === 'cod'}
                    onSelect={() => setSelectedPayment('cod')}
                />

                <View style={styles.spacer} />

                <PriceSummary cartTotal={total} />
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total Payable</Text>
                    <Text style={styles.totalAmount}>₹{finalAmount}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.placeOrderButton, isProcessing && styles.disabledButton]}
                    onPress={handlePlaceOrder}
                    disabled={isProcessing}
                >
                    <Text style={styles.placeOrderText}>{isProcessing ? 'Processing...' : 'Place Order'}</Text>
                </TouchableOpacity>
            </View>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121',
    },
    content: {
        paddingBottom: 100,
    },
    sectionHeaderContainer: {
        padding: 16,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121',
    },
    spacer: {
        height: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    totalContainer: {
        flex: 1,
    },
    totalLabel: {
        fontSize: 12,
        color: '#666',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121',
    },
    placeOrderButton: {
        backgroundColor: '#D9945D',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 4,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    placeOrderText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
