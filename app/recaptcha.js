import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "./firebase-config";

const setupRecaptcha = () => {
  if (!auth.appVerifier) {
    auth.appVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
      },
      auth
    );
  }
  return auth.appVerifier;
};
