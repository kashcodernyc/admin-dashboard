// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseApikey = "AIzaSyBMdSGcU6369KSAuv7RCjXbNknBZ8ffz9E";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseApikey,
  authDomain: "admin-pannel-a4e2e.firebaseapp.com",
  projectId: "admin-pannel-a4e2e",
  storageBucket: "admin-pannel-a4e2e.appspot.com",
  messagingSenderId: "30526790619",
  appId: "1:30526790619:web:52a32a64a322bbbecd65fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
