// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC85MUDjnQcCBLh1wOEsjOaEJg7WnAtgHk",
  authDomain: "product-dispaly.firebaseapp.com",
  projectId: "product-dispaly",
  storageBucket: "product-dispaly.appspot.com",
  messagingSenderId: "222518751187",
  appId: "1:222518751187:web:bd05318064a4a31d3e8926"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=getAuth()
export default app
