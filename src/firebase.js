// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpKBAWYCoJK_-Iv_AQHMwQRKN-zfwa61M",
    authDomain: "react-form-submit-5b02c.firebaseapp.com",
    projectId: "react-form-submit-5b02c",
    storageBucket: "react-form-submit-5b02c.firebasestorage.app",
    messagingSenderId: "302038726748",
    appId: "1:302038726748:web:5a507c9503d9c431904e99",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);  
auth.settings.appVerificationDisabledForTesting = false;