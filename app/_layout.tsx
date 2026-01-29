import { Stack } from "expo-router";
import { AddressProvider } from "../context/AddressContext";
import { CartProvider } from "../context/CartContext";
import { OrdersProvider } from "../context/OrdersContext";

export default function RootLayout() {

  return (
    <CartProvider>
      <AddressProvider>
        <OrdersProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </OrdersProvider>
      </AddressProvider>
    </CartProvider>
  );
}
