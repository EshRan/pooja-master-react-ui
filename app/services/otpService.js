import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase-config";

export const requestOTP = async (phone) => {
  if (!auth.verifier) {
    auth.verifier = new RecaptchaVerifier("recaptcha", { size: "invisible" }, auth);
  }
  return await signInWithPhoneNumber(auth, phone, auth.verifier);
};

export const verifyOTP = async (confirmation, code) => {
  const result = await confirmation.confirm(code);
  return await result.user.getIdToken();
};
