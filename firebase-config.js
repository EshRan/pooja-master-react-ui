import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyApcD8rvNiU1QyB22mj6Z-3SK5y0GUl1KU",
  authDomain: "rituals-basket.firebaseapp.com",
  projectId: "rituals-basket",
  storageBucket: "rituals-basket.firebasestorage.app",
  messagingSenderId: "180407800066",
  appId: "1:180407800066:web:78756f02fb0e2b21cef21b",
  measurementId: "G-VWQNZ81X72"
};

export const app = initializeApp(firebaseConfig);

