
import { useAddress } from '@/context/AddressContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddAddressScreen() {
    const router = useRouter();
    const { addAddress } = useAddress();

    const [form, setForm] = useState({
        fullName: '',
        mobile: '',
        houseNo: '',
        street: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
    });

    const [type, setType] = useState<'Home' | 'Work' | 'Other'>('Home');

    const handleSave = () => {
        if (!form.fullName || !form.mobile || !form.houseNo || !form.pincode) {
            Alert.alert("Error", "Please fill in all required fields");
            return;
        }

        const newAddress = {
            id: Date.now().toString(),
            ...form,
            type,
            isDefault: false,
        };

        addAddress(newAddress);
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#8D7F71" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add New Address</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.label}>Full Name *</Text>
                <TextInput
                    style={styles.input}
                    value={form.fullName}
                    onChangeText={t => setForm({ ...form, fullName: t })}
                    placeholder="John Doe"
                />

                <Text style={styles.label}>Mobile Number *</Text>
                <TextInput
                    style={styles.input}
                    value={form.mobile}
                    onChangeText={t => setForm({ ...form, mobile: t })}
                    keyboardType="phone-pad"
                    placeholder="9876543210"
                    maxLength={10}
                />

                <View style={styles.row}>
                    <View style={styles.half}>
                        <Text style={styles.label}>Pincode *</Text>
                        <TextInput
                            style={styles.input}
                            value={form.pincode}
                            onChangeText={t => setForm({ ...form, pincode: t })}
                            keyboardType="number-pad"
                            maxLength={6}
                        />
                    </View>
                    <View style={styles.half}>
                        <Text style={styles.label}>City *</Text>
                        <TextInput
                            style={styles.input}
                            value={form.city}
                            onChangeText={t => setForm({ ...form, city: t })}
                        />
                    </View>
                </View>

                <Text style={styles.label}>House No / Building *</Text>
                <TextInput
                    style={styles.input}
                    value={form.houseNo}
                    onChangeText={t => setForm({ ...form, houseNo: t })}
                />

                <Text style={styles.label}>Street / Area</Text>
                <TextInput
                    style={styles.input}
                    value={form.street}
                    onChangeText={t => setForm({ ...form, street: t })}
                />

                <Text style={styles.label}>Address Type</Text>
                <View style={styles.typeContainer}>
                    {['Home', 'Work', 'Other'].map((t) => (
                        <TouchableOpacity
                            key={t}
                            style={[styles.typeButton, type === t && styles.activeType]}
                            onPress={() => setType(t as any)}
                        >
                            <Text style={[styles.typeText, type === t && styles.activeTypeText]}>{t}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Address</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF8F0',
    },
    header: {
        padding: 16,
        backgroundColor: '#FFF8F0',
        borderBottomWidth: 1,
        borderBottomColor: '#E6D7C3',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: { marginRight: 16 },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#800000',
    },
    content: {
        padding: 16,
    },
    label: {
        fontSize: 14,
        color: '#4A3B2A',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E6D7C3',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        color: '#212121',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    half: {
        width: '48%',
    },
    typeContainer: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    typeButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E6D7C3',
        marginRight: 12,
        backgroundColor: '#fff',
    },
    activeType: {
        backgroundColor: '#FF9933',
        borderColor: '#FF9933',
    },
    typeText: {
        color: '#4A3B2A',
        fontWeight: '500',
    },
    activeTypeText: {
        color: '#fff',
    },
    saveButton: {
        backgroundColor: '#FF9933',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
