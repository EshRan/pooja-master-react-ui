import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { styles } from "../styles/_styles";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Always allow opening the app
      router.replace("/(tabs)");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.image}
      />
      <ActivityIndicator size="large" color="#EEE5DE" />
    </View>
  );
}
