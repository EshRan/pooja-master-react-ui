import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface DropdownOption {
    label: string;
    value: string;
    price?: number;
}

interface VariantDropdownProps {
    options: DropdownOption[];
    selectedValue?: string;
    onSelect: (option: DropdownOption) => void;
    placeholder?: string;
    disabled?: boolean;
}

export const VariantDropdown: React.FC<VariantDropdownProps> = ({
    options,
    selectedValue,
    onSelect,
    placeholder = 'Select Variant',
    disabled = false
}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const selectedOption = options.find(opt => opt.value === selectedValue);

    return (
        <>
            <TouchableOpacity
                style={[styles.container, disabled && styles.disabled]}
                onPress={() => !disabled && setModalVisible(true)}
                activeOpacity={0.7}
            >
                <View style={styles.textContainer}>
                    <Text style={selectedOption ? styles.selectedText : styles.placeholderText} numberOfLines={1}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </Text>
                </View>
                <Ionicons name="chevron-down" size={16} color="#8D7F71" />
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)} activeOpacity={1}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{placeholder}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={options}
                            keyExtractor={(item, index) => item.value || index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.optionRow, selectedValue === item.value && styles.selectedRow]}
                                    onPress={() => {
                                        onSelect(item);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={[styles.optionLabel, selectedValue === item.value && styles.selectedOptionLabel]}>
                                        {item.label}
                                    </Text>
                                    {item.price !== undefined && (
                                        <Text style={styles.optionPrice}>₹{item.price}</Text>
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E6D7C3', // Creamy border matching ProductCard
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: '#FFF8F0', // Spiritual Cream
        marginTop: 4,
    },
    disabled: {
        opacity: 0.5,
    },
    textContainer: {
        flex: 1,
        marginRight: 4,
    },
    placeholderText: {
        fontSize: 12,
        color: '#8D7F71',
    },
    selectedText: {
        fontSize: 12,
        color: '#4A3B2A', // Spiritual Brown
        fontWeight: '500',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        width: '100%',
        maxHeight: '70%',
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121',
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
    },
    selectedRow: {
        backgroundColor: '#FFF8F0',
    },
    optionLabel: {
        fontSize: 14,
        color: '#333',
    },
    selectedOptionLabel: {
        color: '#D9945D',
        fontWeight: 'bold',
    },
    optionPrice: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
});
