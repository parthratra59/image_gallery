// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWF-WW5Co75JRQ68LXkxETFyXIZZpJIEo",
  authDomain: "constems-ai-fd8e1.firebaseapp.com",
  projectId: "constems-ai-fd8e1",
  storageBucket: "constems-ai-fd8e1.appspot.com",
  messagingSenderId: "790437416174",
  appId: "1:790437416174:web:04978ac75de1223d5f37ff",
  measurementId: "G-Y775L2B0W3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);