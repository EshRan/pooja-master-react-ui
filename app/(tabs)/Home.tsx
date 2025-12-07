import auth from "@react-native-firebase/auth";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Home() {
  async function logout() {
    await auth().signOut();

    // Redirect to login page
    router.replace("/login");
  }

  return (
    <View>
      <Text>Welcome!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
