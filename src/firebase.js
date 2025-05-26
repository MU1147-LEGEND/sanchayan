// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXlAe80dWFbtzVaCPPjd_25oTmZP5MIF0",
    authDomain: "sanchayan-member-form.firebaseapp.com",
    projectId: "sanchayan-member-form",
    storageBucket: "sanchayan-member-form.firebasestorage.app",
    messagingSenderId: "347168629092",
    appId: "1:347168629092:web:a9d20c149f897bcd675a71",
    measurementId: "G-9LMT3MVJQG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);