import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSqOfkP8VIBfK2SRjbIcEe0Jh-bDH1DmY",
  authDomain: "m365calc.firebaseapp.com",
  projectId: "m365calc",
  storageBucket: "m365calc.firebasestorage.app",
  messagingSenderId: "867119847221",
  appId: "1:867119847221:web:253f96e73a6965bf139e7c",
  measurementId: "G-558385HPXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;