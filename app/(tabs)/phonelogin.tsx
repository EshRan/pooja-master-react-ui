import auth from '@react-native-firebase/auth';
import { useState } from 'react';

export default function phonelogin() {
  const [phone, setPhone] = useState("");
  const [confirmResult, setConfirmResult] = useState(null);
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    const confirmation = await auth().signInWithPhoneNumber(phone);
    setConfirmResult(confirmation);
  };

  const verifyOtp = async () => {
    const result = await confirmResult.confirm(otp);
    const idToken = await result.user.getIdToken();
    
    // send this token to your Spring Boot backend
    await fetch("https://your-api.com/auth/phone-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken })
    });
  };
}
