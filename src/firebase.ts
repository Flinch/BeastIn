// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAKh7N3nHM8Cv-0jtQjeoy3Hr2mDEGDnhw",
  authDomain: "beastin-2cae1.firebaseapp.com",
  projectId: "beastin-2cae1",
  storageBucket: "beastin-2cae1.appspot.com",
  messagingSenderId: "429247992766",
  appId: "1:429247992766:web:1a33e639847a0112ffdfef",
  measurementId: "G-9H0HLQSEB0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
