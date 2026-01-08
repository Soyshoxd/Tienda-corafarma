// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0VxG4IYdOckseKQNgBXxlyFkYkHj2_1k",
  authDomain: "corafarma.firebaseapp.com",
  projectId: "corafarma",
  storageBucket: "corafarma.firebasestorage.app",
  messagingSenderId: "793748390610",
  appId: "1:793748390610:web:03a1eca68c8b69f826630b",
  measurementId: "G-3Y9L15VQLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
