// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPPTdxoIKgRKtXpRWG3wXXV3kqvQMs4zs",
  authDomain: "dormi-demo.firebaseapp.com",
  projectId: "dormi-demo",
  storageBucket: "dormi-demo.appspot.com",
  messagingSenderId: "1041915719124",
  appId: "1:1041915719124:web:5d3689c761e0b6e1297a41",
  measurementId: "G-52GKLXYCJ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);