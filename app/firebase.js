// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/firestore';

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxRJ7UY5dGG28z-Y3XRUie2oTEJsg68Mk",
  authDomain: "next-auth-6f562.firebaseapp.com",
  projectId: "next-auth-6f562",
  storageBucket: "next-auth-6f562.appspot.com",
  messagingSenderId: "628431451510",
  appId: "1:628431451510:web:61e44608a352003edf3657",
  measurementId: "G-SZHHJ97E2K"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
// const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
