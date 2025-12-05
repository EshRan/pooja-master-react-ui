import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { requestOTP, verifyOTP } from "../services/otpService";

export default function OTPLoginScreen() {
  const [phone, setPhone] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [otp, setOtp] = useState("");

  const sendOTP = async () => {
    const result = await requestOTP(phone);
    setConfirmation(result);
  };

  const confirmCode = async () => {
    const idToken = await verifyOTP(confirmation, otp);
    console.log("Firebase Token:", idToken);
  };

  return (
    <View className="flex-1 p-4 bg-white justify-center">
      {!confirmation ? (
        <>
          <Text className="text-xl font-bold mb-3">Enter Phone Number</Text>

          <TextInput
            className="border border-gray-300 rounded-lg p-3 mb-4"
            placeholder="+91XXXXXXXXXX"
            keyboardType="phone-pad"
            onChangeText={setPhone}
          />

          <TouchableOpacity
            className="bg-blue-600 py-3 rounded-lg"
            onPress={sendOTP}
          >
            <Text className="text-white text-center font-semibold">Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text className="text-xl font-bold mb-3">Enter OTP</Text>

          <TextInput
            className="border border-gray-300 rounded-lg p-3 mb-4"
            placeholder="6-digit OTP"
            keyboardType="numeric"
            onChangeText={setOtp}
          />

          <TouchableOpacity
            className="bg-green-600 py-3 rounded-lg"
            onPress={confirmCode}
          >
            <Text className="text-white text-center font-semibold">Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
