import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../styles/_styles";

export default function Login() {
  const [number, setNumber] = useState("");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo_without_name.png")}
        style={styles.image}
      />

      <View style={styles.box}>
        <View style={styles.phoneInputContainer}>
          <Text style={styles.countryCode}>+91</Text>

          <TextInput
            style={styles.input}
            value={number}
            onChangeText={setNumber}
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        <Pressable
          style={styles.continue_button}
          onPress={() =>
            router.push({
            pathname: "./authentication/phoneSignIn",
            params: { phone: `+91${number}` },
            })
          }
        >
          <Text style={styles.continue_text}>Continue</Text>
        </Pressable>

        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.orLine} />
        </View>

        <Pressable
          style={[styles.continue_button, styles.google_button]}
        >
          <Image
            style={styles.google_icon}
            source={require("../assets/images/google_logo.png")}
          />
          <Text style={styles.continue_google_text}>
            Continue with Google
          </Text>
        </Pressable>

        <Text style={styles.termsText}>
          By clicking continue, you agree to our{" "}
          <Text style={styles.linkText}>Terms of Service</Text> and{" "}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}
