// src/Components/LoginWithGoogle.jsx
import React from 'react';
import { auth, signInWithPopup, GoogleAuthProvider } from '../firebaseConfig'; // Updated import path

const LoginWithGoogle = () => {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log('User logged in with Google');
    } catch (error) {
      console.error('Error logging in with Google:', error.message);
    }
  };

  return (
    <button onClick={handleLogin}>Sign In with Google</button>
  );
};

export default LoginWithGoogle;
