import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../../styles/_styles";

export default function PhoneSignIn() {
  const { phone } = useLocalSearchParams<{ phone: string }>();

  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState("");

  // 🔹 Auto-send OTP when screen opens
  useEffect(() => {
    if (phone) {
      sendOtp();
    }
  }, [phone]);

  async function sendOtp() {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone!);
      setConfirm(confirmation);
      console.log("OTP sent");
    } catch (err) {
      console.log("Send OTP error:", err);
    }
  }

  async function confirmCode() {
    if (!confirm) return;

    try {
      await confirm.confirm(code);
      router.replace("/(tabs)");
    } catch (error) {
      console.log("Invalid code", error);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo_without_name.png")}
        style={styles.image}
      />

      <View style={styles.box}>
        {/* Phone number (read-only) */}
        <View style={styles.phoneInputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            value={phone?.replace("+91", "")}
            editable={false}
          />
        </View>

        {/* OTP Input */}
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={setCode}
          placeholder="Enter OTP"
          keyboardType="number-pad"
          maxLength={6}
        />

        <Pressable
          style={styles.continue_button}
          onPress={confirmCode}
        >
          <Text style={styles.continue_text}>Verify OTP</Text>
        </Pressable>

        <Text style={styles.termsText}>
          Didn’t receive OTP?{" "}
          <Text style={styles.linkText} onPress={sendOtp}>
            Resend
          </Text>
        </Text>
      </View>
    </View>
  );
}
