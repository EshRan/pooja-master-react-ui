
import { createContext, ReactNode, useContext, useState } from 'react';

export interface Address {
    id: string;
    fullName: string;
    mobile: string;
    houseNo: string;
    street: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    type: 'Home' | 'Work' | 'Other';
    isDefault: boolean;
}

interface AddressContextType {
    addresses: Address[];
    addAddress: (address: Address) => void;
    updateAddress: (id: string, address: Address) => void;
    deleteAddress: (id: string) => void;
    setDefaultAddress: (id: string) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: '1',
            fullName: 'Charan Teja',
            mobile: '9876543210',
            houseNo: 'Flat 101',
            street: 'Temple Street',
            landmark: 'Near Ganesh Temple',
            city: 'Hyderabad',
            state: 'Telangana',
            pincode: '500001',
            type: 'Home',
            isDefault: true,
        },
    ]);

    const addAddress = (address: Address) => {
        setAddresses((prev) => {
            if (address.isDefault) {
                return [...prev.map((a) => ({ ...a, isDefault: false })), address];
            }
            return [...prev, address];
        });
    };

    const updateAddress = (id: string, updatedAddress: Address) => {
        setAddresses((prev) =>
            prev.map((addr) => (addr.id === id ? updatedAddress : addr))
        );
    };

    const deleteAddress = (id: string) => {
        setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    };

    const setDefaultAddress = (id: string) => {
        setAddresses((prev) =>
            prev.map((addr) => ({ ...addr, isDefault: addr.id === id }))
        );
    };

    return (
        <AddressContext.Provider
            value={{ addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress }}
        >
            {children}
        </AddressContext.Provider>
    );
};

export const useAddress = () => {
    const context = useContext(AddressContext);
    if (!context) {
        throw new Error('useAddress must be used within an AddressProvider');
    }
    return context;
};
