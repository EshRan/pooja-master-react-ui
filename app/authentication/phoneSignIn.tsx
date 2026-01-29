import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../../styles/_styles";

export default function PhoneSignIn() {
  const { phone } = useLocalSearchParams<{ phone: string }>();

  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState("");

  const sendOtp = useCallback(async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone!);
      setConfirm(confirmation);
      console.log("OTP sent");
    } catch (err: any) {
      console.log("Send OTP error:", err);
      Alert.alert("Error", err.message || "Failed to send OTP. Please try again.");
    }
  }, [phone]);

  // 🔹 Auto-send OTP when screen opens
  useEffect(() => {
    if (phone) {
      sendOtp();
    }
  }, [phone, sendOtp]);



  async function confirmCode() {
    if (!confirm) {
      Alert.alert("Error", "OTP not sent yet. Please wait or click Resend.");
      return;
    }

    if (!code || code.length < 6) {
      Alert.alert("Error", "Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      await confirm.confirm(code);
      router.replace("/(tabs)/Home");
    } catch (error: any) {
      console.log("Invalid code", error);
      Alert.alert("Failed", "Invalid OTP. Please try again.");
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
