// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvkvF4N01W7SNpPaBp9Fpka7057AMBfig",
  authDomain: "cinemind-ee70a.firebaseapp.com",
  projectId: "cinemind-ee70a",
  storageBucket: "cinemind-ee70a.appspot.com",
  messagingSenderId: "1025276185838",
  appId: "1:1025276185838:web:ac5ec9547789262b9ef7ff",
  measurementId: "G-4V7R71ZL5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();