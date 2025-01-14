// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_8CRPYIL7hF9ODlBagoynttmR1F4eHSQ",
  authDomain: "yuki-2f873.firebaseapp.com",
  projectId: "yuki-2f873",
  storageBucket: "yuki-2f873.firebasestorage.app",
  messagingSenderId: "514678448392",
  appId: "1:514678448392:web:31633d91aa44d8e86a4cbd",
  measurementId: "G-04Z3Y3BJ0L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Sign-in provider
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  sendPasswordResetEmail,
};
