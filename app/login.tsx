import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { router } from "expo-router";
import { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, TextInput, View } from 'react-native';



export default function PhoneSignIn() {
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('+91');

  // Monitor auth state
  function handleAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (user) {
      console.log("User logged in:", user.phoneNumber);
      router.replace('/(tabs)');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Send OTP
  async function handleSendOtp() {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone);// For testing purposes only
      setConfirm(confirmation);
      console.log("OTP sent");
    } catch (err) {
      console.log("Send OTP error:", err);
    }
  }

  // Confirm OTP
  async function confirmCode() {
    if(!confirm) return;
    try {
      await confirm.confirm(code);
      console.log('Phone number verified!');
    } catch (error) {
      console.log('Invalid code', error);
    }
  }

  return (
    <View style={styles.container}>
      <Image 
        source={require("../assets/images/logo.png")}
        style={styles.image}     // ✔ correct
      />
      {!confirm ? (
        <>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
          <Button title="Send OTP" onPress={handleSendOtp} />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={setCode}
            placeholder="Enter OTP"
            keyboardType="number-pad"
          />
          <Button title="Confirm Code" onPress={confirmCode} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
   image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});
