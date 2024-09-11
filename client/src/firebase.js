// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-c1d3f.firebaseapp.com",
  projectId: "mern-estate-c1d3f",
  storageBucket: "mern-estate-c1d3f.appspot.com",
  messagingSenderId: "793561953423",
  appId: "1:793561953423:web:658b523e63a8146afaecfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
export { app}