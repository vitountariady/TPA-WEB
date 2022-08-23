// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgo1mvAjSB46nlKXRXDA7IGB8vQjxYVQ0",
  authDomain: "linkhedin-vt.firebaseapp.com",
  projectId: "linkhedin-vt",
  storageBucket: "linkhedin-vt.appspot.com",
  messagingSenderId: "881020104925",
  appId: "1:881020104925:web:99caa7eb70950d48b9eb34",
  measurementId: "G-2K074E6VBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const analytics = getAnalytics(app);

export{app, storage}