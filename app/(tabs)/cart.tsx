
import { PriceSummary } from '@/components/PriceSummary';
import { useCart } from '@/context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen() {
    const router = useRouter();
    const { cart, removeFromCart, updateQuantity, getTotal } = useCart();
    const total = getTotal();

    if (cart.length === 0) {
        return (
            <SafeAreaView style={styles.emptyContainer}>
                <Ionicons name="cart-outline" size={80} color="#ddd" />
                <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
                <Text style={styles.emptySubtitle}>Explore our wide range of pooja kits and items.</Text>
                <TouchableOpacity style={styles.shopNowButton} onPress={() => router.push('/(tabs)/Home')}>
                    <Text style={styles.shopNowText}>Shop Now</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Cart ({cart.length})</Text>
            </View>

            <FlatList
                data={cart}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 100 }}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <View style={styles.itemRow}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} contentFit="contain" />
                            </View>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemTitle} numberOfLines={2}>
                                    {item.title} {item.variantLabel ? `(${item.variantLabel})` : ''}
                                </Text>
                                <Text style={styles.itemPrice}>₹{item.price}</Text>

                                {item.itemsIncluded && item.itemsIncluded.length > 0 && (
                                    <View style={styles.includedItemsContainer}>
                                        <Text style={styles.includedItemsTitle}>Includes:</Text>
                                        {item.itemsIncluded.map((subItem: any, idx: number) => (
                                            <Text key={idx} style={styles.includedItemText}>
                                                • {subItem.name} x {subItem.quantity}
                                                {subItem.isExtra ? ' (Extra)' : ''}
                                            </Text>
                                        ))}
                                    </View>
                                )}
                            </View>
                        </View>

                        <View style={styles.actionsRow}>
                            <View style={styles.quantityControl}>
                                <TouchableOpacity
                                    style={styles.qtyBtn}
                                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                    <Text style={styles.qtyText}>-</Text>
                                </TouchableOpacity>
                                <View style={styles.qtyValue}>
                                    <Text style={styles.qtyValueText}>{item.quantity}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.qtyBtn}
                                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    <Text style={styles.qtyText}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                <Text style={styles.removeText}>REMOVE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListFooterComponent={<PriceSummary cartTotal={total} />}
            />

            <View style={styles.footer}>
                <View>
                    <Text style={styles.footerTotal}>₹{total + 50}</Text>
                    <Text style={styles.viewDetailsText}>View Price Details</Text>
                </View>
                <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={() => router.push('/checkout/address')}
                >
                    <Text style={styles.checkoutText}>Place Order</Text>
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
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        color: '#212121',
    },
    emptySubtitle: {
        marginTop: 8,
        color: '#878787',
        textAlign: 'center',
        marginBottom: 24,
    },
    shopNowButton: {
        backgroundColor: '#D9945D',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 4,
    },
    shopNowText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cartItem: {
        backgroundColor: '#fff',
        marginBottom: 8,
        padding: 12,
    },
    itemRow: {
        flexDirection: 'row',
    },
    imageContainer: {
        width: 80,
        height: 80,
        marginRight: 12,
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    itemDetails: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 14,
        color: '#212121',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121',
    },
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f9f9f9',
        paddingTop: 8,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#c2c2c2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qtyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121',
    },
    qtyValue: {
        paddingHorizontal: 12,
    },
    qtyValueText: {
        fontWeight: 'bold',
    },
    removeText: {
        fontWeight: 'bold',
        color: '#212121',
        fontSize: 13,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    footerTotal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121',
    },
    viewDetailsText: {
        fontSize: 12,
        color: '#2874f0',
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: '#D9945D',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 4,
        minWidth: 150,
        alignItems: 'center',
    },
    checkoutText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    includedItemsContainer: {
        marginTop: 8,
        backgroundColor: '#f9f9f9',
        padding: 8,
        borderRadius: 4,
    },
    includedItemsTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 4,
    },
    includedItemText: {
        fontSize: 12,
        color: '#555',
        lineHeight: 18,
    },
});
