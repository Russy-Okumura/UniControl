// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuración del proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBvuvARhtyDnZLjO_ExI1d_BFIzAezbaxg",
  authDomain: "unicontrol-72fe1.firebaseapp.com",
  projectId: "unicontrol-72fe1",
  storageBucket: "unicontrol-72fe1.appspot.com",
  messagingSenderId: "375660497545",
  appId: "1:375660497545:web:fd82be201cb81e187a9458"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);