import { initializeApp } from "firebase/app";
import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDjVnX_nRPmyHYjZf7ccdTZM2WyAKifMus",
  authDomain: "grievance-72d1c.firebaseapp.com",
  projectId: "grievance-72d1c",
  storageBucket: "grievance-72d1c.appspot.com",
  messagingSenderId: "174450253742",
  appId: "1:174450253742:web:6c0c86477214bfd78fb23f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebase;