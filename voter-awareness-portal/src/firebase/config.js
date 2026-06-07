// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCx5S-ej8LYbbJJ-4yYdN-0Ci35bvNi19A",
  authDomain: "votingsystem-a7889.firebaseapp.com",
  projectId: "votingsystem-a7889",
  storageBucket: "votingsystem-a7889.firebasestorage.app",
  messagingSenderId: "162795671831",
  appId: "1:162795671831:web:190d44999bed0083836752"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;