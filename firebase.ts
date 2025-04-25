import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC6-KFXqY9Gf7YCYVEQpTSOVfl6iXSXKQ8",
  authDomain: "vite-contact-b0a7a.firebaseapp.com",
  projectId: "vite-contact-b0a7a",
  storageBucket: "vite-contact-b0a7a.firebasestorage.app",
  messagingSenderId: "715182976493",
  appId: "1:715182976493:web:5b44c8bc7a7ba04be7cbe4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 