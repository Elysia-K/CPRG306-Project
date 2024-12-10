import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAyoraBUr5Rb0tzrGsqskKlctHMMQK49vo',
  authDomain: 'cprg306-project-58447.firebaseapp.com',
  projectId: 'cprg306-project-58447',
  storageBucket: 'cprg306-project-58447.firebasestorage.app',
  messagingSenderId: '424397990737',
  appId: '1:424397990737:web:943ba4fd1509792d398170',
  measurementId: 'G-S05FRX9B33',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Analytics 초기화는 클라이언트 환경에서만 실행
export const initializeAnalytics = async () => {
  if (typeof window !== 'undefined') {
    const { getAnalytics, isSupported } = await import('firebase/analytics');
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
    console.log('Firebase Analytics is not supported in this environment.');
    return null;
  }
};
