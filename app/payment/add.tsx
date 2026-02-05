
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddCardScreen() {
    const router = useRouter();
    const [form, setForm] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });

    const handleSave = () => {
        if (!form.number || !form.name || !form.expiry || !form.cvv) {
            Alert.alert("Error", "Please fill in all details");
            return;
        }
        // In real app, save to backend/context
        Alert.alert("Success", "Card Added Successfully", [
            { text: "OK", onPress: () => router.back() }
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#8D7F71" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add New Card</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.label}>Card Number</Text>
                <TextInput
                    style={styles.input}
                    value={form.number}
                    onChangeText={t => setForm({ ...form, number: t })}
                    placeholder="0000 0000 0000 0000"
                    keyboardType="number-pad"
                    maxLength={19}
                />

                <Text style={styles.label}>Cardholder Name</Text>
                <TextInput
                    style={styles.input}
                    value={form.name}
                    onChangeText={t => setForm({ ...form, name: t })}
                    placeholder="Name on card"
                    autoCapitalize="characters"
                />

                <View style={styles.row}>
                    <View style={styles.half}>
                        <Text style={styles.label}>Expiry Date</Text>
                        <TextInput
                            style={styles.input}
                            value={form.expiry}
                            onChangeText={t => setForm({ ...form, expiry: t })}
                            placeholder="MM/YY"
                            maxLength={5}
                        />
                    </View>
                    <View style={styles.half}>
                        <Text style={styles.label}>CVV</Text>
                        <TextInput
                            style={styles.input}
                            value={form.cvv}
                            onChangeText={t => setForm({ ...form, cvv: t })}
                            placeholder="123"
                            keyboardType="number-pad"
                            maxLength={4}
                            secureTextEntry
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Card</Text>
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
