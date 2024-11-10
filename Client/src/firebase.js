// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-reblogproject-7172.firebaseapp.com",
  projectId: "mern-reblogproject-7172",
  storageBucket: "mern-reblogproject-7172.firebasestorage.app",
  messagingSenderId: "1044593245855",
  appId: "1:1044593245855:web:d7227879afddf40dd4ecaa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);