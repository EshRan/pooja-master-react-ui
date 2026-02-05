
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentListScreen() {
    const router = useRouter();
    // Mock data for payments
    const cards = [
        { id: '1', type: 'Visa', last4: '4242', expiry: '12/26' },
        { id: '2', type: 'Mastercard', last4: '8888', expiry: '09/25' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#8D7F71" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment Methods</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <TouchableOpacity
                    style={styles.addNewButton}
                    onPress={() => router.push('/payment/add')}
                >
                    <Ionicons name="add" size={24} color="#FF9933" />
                    <Text style={styles.addNewText}>Add New Card</Text>
                </TouchableOpacity>

                <View style={styles.list}>
                    {cards.map((card) => (
                        <View key={card.id} style={styles.card}>
                            <View style={styles.cardIcon}>
                                <Ionicons name="card" size={24} color="#555" />
                            </View>
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardTitle}>{card.type} **** {card.last4}</Text>
                                <Text style={styles.cardExpiry}>Expires {card.expiry}</Text>
                            </View>
                            <TouchableOpacity>
                                <Ionicons name="trash-outline" size={20} color="#FF6666" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
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
    addNewButton: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
        marginBottom: 24,
        borderWidth: 1.5,
        borderColor: '#FF9933',
        borderStyle: 'dashed',
    },
    addNewText: {
        color: '#FF9933',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
    list: {
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E6D7C3',
    },
    cardIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    cardInfo: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        color: '#212121',
        fontWeight: '500',
    },
    cardExpiry: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
});
