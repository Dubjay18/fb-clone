// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu6xHEX1GyhKpacUdq1KBilro3_tuOtow",
  authDomain: "next-fb-eee87.firebaseapp.com",
  projectId: "next-fb-eee87",
  storageBucket: "next-fb-eee87.appspot.com",
  messagingSenderId: "426669847165",
  appId: "1:426669847165:web:27a9a4a8528903949f3714",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, db, storage };
