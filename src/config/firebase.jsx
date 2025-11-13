// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoTtjNPNbKZLI3E66m9HDyPugtgotH9SI",
  authDomain: "todo-app-with-firebase-29863.firebaseapp.com",
  projectId: "todo-app-with-firebase-29863",
  storageBucket: "todo-app-with-firebase-29863.firebasestorage.app",
  messagingSenderId: "245892666459",
  appId: "1:245892666459:web:bb4e161032111e1caf9b7e",
  measurementId: "G-6NLKJSG232"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);