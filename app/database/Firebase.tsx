// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Import Firestore functions
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5qgN6AVACVDJBcivK-KDvv9OHphF6I7c",
  authDomain: "app-airguard.firebaseapp.com",
  projectId: "app-airguard",
  storageBucket: "app-airguard.firebasestorage.app",
  messagingSenderId: "558342477826",
  appId: "1:558342477826:web:da2af0e2d2f2d366412f1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};