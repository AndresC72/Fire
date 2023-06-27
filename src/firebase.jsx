// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration, replace it with your project keys
const firebaseConfig = {
  apiKey: "AIzaSyDzig3mUMAQoaoUSobnLUfafej1eRk5y1s",
  authDomain: "react-auth-6e870.firebaseapp.com",
  projectId: "react-auth-6e870",
  storageBucket: "react-auth-6e870.appspot.com",
  messagingSenderId: "360181114436",
  appId: "1:360181114436:web:a32d0fb3ddcacc52283e11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
 export const googleProvider = new GoogleAuthProvider();

 export const db = getFirestore(app);