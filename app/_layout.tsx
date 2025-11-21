import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function TabsLayout() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Festival Tab */}
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => router.push("/tabs/_festival_essentials")}
      >
        <Image
          source={require("../assets/images/homeIcons/ganesha.png")}
          style={styles.tabImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  tabButton: {
    width: "90%",
    height: 150,
    marginVertical: 15,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 4,
  },

  tabImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
