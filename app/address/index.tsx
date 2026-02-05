
import { AddressCard } from '@/components/AddressCard';
import { useAddress } from '@/context/AddressContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddressListScreen() {
    const router = useRouter();
    const { addresses, deleteAddress } = useAddress();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#8D7F71" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Saved Addresses</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    style={styles.addNewButton}
                    onPress={() => router.push('/address/add')}
                >
                    <Ionicons name="add" size={24} color="#FF9933" />
                    <Text style={styles.addNewText}>Add New Address</Text>
                </TouchableOpacity>

                <View style={styles.addressList}>
                    {addresses.map((addr) => (
                        <AddressCard
                            key={addr.id}
                            address={addr}
                            selected={false}
                            onSelect={() => { }} // No selection in management mode
                            showEdit={true}
                            onEdit={() => {
                                // In a real app, populate form with addr data
                                Alert.alert("Edit", "Edit functionality to be implemented");
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF8F0', // Spiritual Cream
    },
    header: {
        padding: 16,
        backgroundColor: '#FFF8F0',
        borderBottomWidth: 1,
        borderBottomColor: '#E6D7C3',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#800000', // Maroon
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
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1.5,
        borderColor: '#FF9933', // Saffron
        borderStyle: 'dashed',
    },
    addNewText: {
        color: '#FF9933',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
    addressList: {
        marginBottom: 16,
    },
});
