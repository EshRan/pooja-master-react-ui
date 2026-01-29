
import { AddressCard } from '@/components/AddressCard';
import { useAddress } from '@/context/AddressContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CheckoutAddressScreen() {
    const router = useRouter();
    const { addresses, setDefaultAddress } = useAddress();
    const [selectedAddressId, setSelectedAddressId] = useState(
        addresses.find(a => a.isDefault)?.id || addresses[0]?.id
    );

    const handleContinue = () => {
        if (selectedAddressId) {
            router.push({ pathname: "/checkout/payment", params: { addressId: selectedAddressId } });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select Address</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.addNewButton} onPress={() => {/* Navigate to Add Address */ }}>
                    <Ionicons name="add" size={24} color="#D9945D" />
                    <Text style={styles.addNewText}>Add New Address</Text>
                </TouchableOpacity>

                <View style={styles.addressList}>
                    {addresses.map((addr) => (
                        <AddressCard
                            key={addr.id}
                            address={addr}
                            selected={selectedAddressId === addr.id}
                            onSelect={() => setSelectedAddressId(addr.id)}
                            showEdit={true}
                            onEdit={() => {/* Edit address logic */ }}
                        />
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.continueButton, !selectedAddressId && styles.disabledButton]}
                    onPress={handleContinue}
                    disabled={!selectedAddressId}
                >
                    <Text style={styles.continueText}>Continue to Payment</Text>
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
        padding: 16,
        paddingBottom: 100,
    },
    addNewButton: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 4,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#D9945D',
        borderStyle: 'dashed',
    },
    addNewText: {
        color: '#D9945D',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
    addressList: {
        marginBottom: 16,
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
    },
    continueButton: {
        backgroundColor: '#D9945D',
        paddingVertical: 14,
        borderRadius: 4,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    continueText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
