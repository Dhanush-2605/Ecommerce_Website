// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "shop-e38ce.firebaseapp.com",
  projectId: "shop-e38ce",
  storageBucket: "shop-e38ce.appspot.com",
  messagingSenderId: "33638609251",
  appId: "1:33638609251:web:f06c7a1a60cd6feda6e356"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;