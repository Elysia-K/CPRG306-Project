// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAyoraBUr5Rb0tzrGsqskKlctHMMQK49vo',
  authDomain: 'cprg306-project-58447.firebaseapp.com',
  projectId: 'cprg306-project-58447',
  storageBucket: 'cprg306-project-58447.firebasestorage.app',
  messagingSenderId: '424397990737',
  appId: '1:424397990737:web:943ba4fd1509792d398170',
  measurementId: 'G-S05FRX9B33',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
