// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpPCK6wEHUtz5lY1WwSOfIDAzmY6LBkio",
  authDomain: "medchain-group-8.firebaseapp.com",
  projectId: "medchain-group-8",
  storageBucket: "medchain-group-8.firebasestorage.app",
  messagingSenderId: "924034514574",
  appId: "1:924034514574:web:b14b239ee0e29b25b313df",
  measurementId: "G-2T4ZRW3DPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
