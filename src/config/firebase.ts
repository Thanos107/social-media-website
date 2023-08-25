// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9ilUvKIGz0lbaKN-6dieq844Xm-oLaJw",
  authDomain: "social-media-project-82985.firebaseapp.com",
  projectId: "social-media-project-82985",
  storageBucket: "social-media-project-82985.appspot.com",
  messagingSenderId: "67338300866",
  appId: "1:67338300866:web:556d8d181c6380a931fa5b",
  measurementId: "G-ESYYHDCD7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// setting up authentication with Firebase
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)