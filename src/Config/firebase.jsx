import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDlUxJDZGr3xGdxXBD-2cnwaCguR-fb7_s",
  authDomain: "firestore-1-c5da4.firebaseapp.com",
  projectId: "firestore-1-c5da4",
  storageBucket: "firestore-1-c5da4.firebasestorage.app",
  messagingSenderId: "1044341025037",
  appId: "1:1044341025037:web:fe51025b509e07c1e2e844"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);


export {database}