import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "../styles/_styles";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Always allow opening the app
      router.replace("/(tabs)/Home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo_without_name.png")}
        style={styles.image}
      />
      <Text style={styles.bufferTitle}>
        Rituals Basket
      </Text>

      <View style={styles.loaderContainer}>
        <Feather name="shopping-cart" size={24} color="#D9945D" />
        <Text style={styles.loaderText}>...</Text>
      </View>
    </View>
  );
}
