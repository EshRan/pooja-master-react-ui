
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Address } from '../context/AddressContext';

interface AddressCardProps {
    address: Address;
    selected?: boolean;
    onSelect?: () => void;
    onEdit?: () => void;
    showEdit?: boolean;
}

export const AddressCard: React.FC<AddressCardProps> = ({ address, selected, onSelect, onEdit, showEdit = false }) => {
    return (
        <TouchableOpacity
            style={[styles.container, selected && styles.selectedContainer]}
            onPress={onSelect}
            disabled={!onSelect}
        >
            <View style={styles.header}>
                <Text style={styles.name}>{address.fullName}</Text>
                <View style={styles.typeTag}>
                    <Text style={styles.typeText}>{address.type}</Text>
                </View>
            </View>

            <Text style={styles.addressText}>
                {address.houseNo}, {address.street}
            </Text>
            <Text style={styles.addressText}>
                {address.landmark}, {address.city}
            </Text>
            <Text style={styles.addressText}>
                {address.state} - {address.pincode}
            </Text>
            <Text style={[styles.addressText, styles.mobile]}>
                {address.mobile}
            </Text>

            {showEdit && onEdit && (
                <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                    <Text style={styles.editText}>EDIT</Text>
                </TouchableOpacity>
            )}

            {selected && (
                <View style={styles.checkIcon}>
                    <Ionicons name="checkmark-circle" size={24} color="#D9945D" />
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        borderRadius: 4,
    },
    selectedContainer: {
        borderColor: '#D9945D',
        backgroundColor: '#FFF8F0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121',
        marginRight: 8,
    },
    typeTag: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    typeText: {
        fontSize: 10,
        color: '#666',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    addressText: {
        fontSize: 14,
        color: '#212121',
        lineHeight: 20,
        marginBottom: 2,
    },
    mobile: {
        marginTop: 8,
        fontWeight: '500',
    },
    editButton: {
        marginTop: 12,
        paddingVertical: 8,
    },
    editText: {
        color: '#D9945D',
        fontWeight: 'bold',
        fontSize: 14,
    },
    checkIcon: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
});
