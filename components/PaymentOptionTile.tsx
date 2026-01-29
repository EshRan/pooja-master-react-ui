
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PaymentOptionTileProps {
    id: string;
    title: string;
    subtitle?: string;
    icon: any;
    selected: boolean;
    onSelect: () => void;
}

export const PaymentOptionTile: React.FC<PaymentOptionTileProps> = ({ id, title, subtitle, icon, selected, onSelect }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onSelect}>
            <View style={styles.row}>
                <View style={styles.radio}>
                    {selected && <View style={styles.radioSelected} />}
                </View>
                <View style={styles.iconContainer}>
                    {icon}
                </View>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#757575',
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#D9945D',
    },
    iconContainer: {
        marginRight: 16,
        width: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        color: '#212121',
    },
    subtitle: {
        fontSize: 12,
        color: '#878787',
        marginTop: 2,
    },
});
