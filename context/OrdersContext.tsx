
import { createContext, ReactNode, useContext, useState } from 'react';
import { Address } from './AddressContext';
import { CartItem } from './CartContext';

export interface Order {
    id: string;
    items: CartItem[];
    totalAmount: number;
    deliveryAddress: Address;
    paymentMethod: string;
    status: 'Placed' | 'Packed' | 'Shipped' | 'Delivered';
    date: string;
}

interface OrdersContextType {
    orders: Order[];
    placeOrder: (items: CartItem[], totalAmount: number, address: Address, paymentMethod: string) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([]);

    const placeOrder = (items: CartItem[], totalAmount: number, address: Address, paymentMethod: string) => {
        const newOrder: Order = {
            id: `ORD${Math.floor(Math.random() * 100000)}`,
            items,
            totalAmount,
            deliveryAddress: address,
            paymentMethod,
            status: 'Placed',
            date: new Date().toISOString(),
        };
        setOrders((prev) => [newOrder, ...prev]);
    };

    return (
        <OrdersContext.Provider value={{ orders, placeOrder }}>
            {children}
        </OrdersContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrdersContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrdersProvider');
    }
    return context;
};
