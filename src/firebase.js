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
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";

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
const db = getFirestore(app);

// Google Sign-in provider
const googleProvider = new GoogleAuthProvider();

// Menu data functions
async function uploadMenuData(menuData) {
  try {
    const menuCollection = collection(db, "menu");

    for (const category of menuData) {
      const categoryDoc = doc(
        menuCollection,
        category.category.toLowerCase().replace(/\s+/g, "-")
      );
      await setDoc(categoryDoc, {
        name: category.category,
        items: category.items.map((item) => ({
          ...item,
          price: parseFloat(item.price.replace("£", "")),
          id: item.name.toLowerCase().replace(/\s+/g, "-"),
        })),
      });
    }
    console.log("Menu data uploaded successfully");
  } catch (error) {
    console.error("Error uploading menu data:", error);
    throw error;
  }
}

// Order management functions
async function createOrder(orderData) {
  try {
    const ordersCollection = collection(db, "orders");

    const orderDoc = {
      customerId: orderData.customerId,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      items: orderData.items.map((item) => ({
        itemId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: orderData.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      status: "pending",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(ordersCollection, orderDoc);
    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

async function updateOrderStatus(orderId, newStatus) {
  try {
    const orderRef = doc(db, "orders", orderId);
    await setDoc(
      orderRef,
      {
        status: newStatus,
        updatedAt: Timestamp.now(),
      },
      { merge: true }
    );
    console.log("Order status updated successfully");
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  sendPasswordResetEmail,
  uploadMenuData,
  createOrder,
  updateOrderStatus,
};
