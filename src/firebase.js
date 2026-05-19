// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLa64FGSk_xSPNurJBAyKUzPzAKoBz2b0",
  authDomain: "freefire-f8080.firebaseapp.com",
  projectId: "freefire-f8080",
  storageBucket: "freefire-f8080.firebasestorage.app",
  messagingSenderId: "34028336035",
  appId: "1:34028336035:web:22a2846c12930910912016"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);
export default app;
