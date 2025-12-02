import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      router.push("/home");
    } else {
      alert("Please enter username & password");
    }
  };

  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-3xl font-bold mb-8">Login</Text>

        <TextInput
          className="border w-full p-3 rounded-lg mb-4"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          className="border w-full p-3 rounded-lg mb-4"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={handleLogin}
          className="bg-blue-600 w-full p-3 rounded-lg"
        >
          <Text className="text-white text-center font-semibold">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
