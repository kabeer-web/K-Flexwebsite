// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCedAz7oKg7_SvZ5lKpav-URTFBY69tUpY",
  authDomain: "khf-e68b4.firebaseapp.com",
  projectId: "khf-e68b4",
  storageBucket: "khf-e68b4.appspot.com",
  messagingSenderId: "850641293614",  
  appId: "1:850641293614:web:1eec69b2f7be4702062abf",
  measurementId: "G-XGRKMJ1R7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, googleProvider };

