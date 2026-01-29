
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface PriceSummaryProps {
    cartTotal: number;
    deliveryCharge?: number;
    discount?: number;
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({ cartTotal, deliveryCharge = 50, discount = 0 }) => {
    const finalTotal = cartTotal + deliveryCharge - discount;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Price Details</Text>

            <View style={styles.row}>
                <Text style={styles.label}>Price ({Math.floor(cartTotal / 100) || 1} items)</Text>
                <Text style={styles.value}>₹{cartTotal}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Delivery Charges</Text>
                <Text style={[styles.value, styles.green]}>₹{deliveryCharge}</Text>
            </View>

            {discount > 0 && (
                <View style={styles.row}>
                    <Text style={styles.label}>Discount</Text>
                    <Text style={[styles.value, styles.green]}>-₹{discount}</Text>
                </View>
            )}

            <View style={styles.divider} />

            <View style={styles.row}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>₹{finalTotal}</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.saveMessage}>You will save ₹{discount} on this order</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 16,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#878787',
        marginBottom: 16,
        textTransform: 'uppercase',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        color: '#212121',
    },
    value: {
        fontSize: 16,
        color: '#212121',
    },
    green: {
        color: '#388E3C',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 12,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121',
    },
    footer: {
        marginTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 12,
    },
    saveMessage: {
        color: '#388E3C',
        fontWeight: 'bold',
    },
});
