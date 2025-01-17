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
  deleteDoc,
  query,
  where,
  updateDoc,
  orderBy,
  getDocs,
  writeBatch,
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

    // Create base order document with proper number parsing
    const orderDoc = {
      items: orderData.items.map((item) => ({
        itemId: item.name.toLowerCase().replace(/\s+/g, "-"),
        name: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price.replace(/[^0-9.-]+/g, "")),
      })),
      customer: {
        name: orderData.name,
        phone: orderData.phone,
        address: orderData.address,
      },
      delivery: {
        address: orderData.address,
        fee: parseFloat(orderData.deliveryFee) || 0,
      },
      subtotal: parseFloat(orderData.subtotal) || 0,
      tax: parseFloat(orderData.tax) || 0,
      tip: parseFloat(orderData.tip) || 0,
      total: parseFloat(orderData.total) || 0,
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

async function submitContactForm(formData) {
  try {
    const contactCollection = collection(db, "contact-submissions");

    const contactDoc = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      message: formData.message,
      createdAt: Timestamp.now(),
      archived: false,
    };

    const docRef = await addDoc(contactCollection, contactDoc);
    return docRef.id;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
}

//Contact Submission

async function archiveContactSubmission(submissionId) {
  try {
    const submissionRef = doc(db, "contact-submissions", submissionId);
    await updateDoc(submissionRef, {
      archived: true,
      archivedAt: Timestamp.now(),
    });
    console.log("Message archived successfully");
  } catch (error) {
    console.error("Error archiving message:", error);
    throw error;
  }
}

async function deleteContactSubmission(submissionId) {
  try {
    const submissionRef = doc(db, "contact-submissions", submissionId);
    await deleteDoc(submissionRef);
    console.log("Message deleted successfully");
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
}

async function resetAllOrders() {
  try {
    const batch = writeBatch(db);
    const ordersRef = collection(db, "orders");
    const snapshot = await getDocs(ordersRef);

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log("All orders have been reset");
  } catch (error) {
    console.error("Error resetting orders:", error);
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
  submitContactForm,
  archiveContactSubmission,
  deleteContactSubmission,
  resetAllOrders,
};
