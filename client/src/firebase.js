import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBy0aHi-dZD4oj0SnQBdoP_6ohJ8uYvGWY",
  authDomain: "clone-b6683.firebaseapp.com",
  projectId: "clone-b6683",
  storageBucket: "clone-b6683.appspot.com",
  messagingSenderId: "752721266893",
  appId: "1:752721266893:web:ce054d521ce37674030184",
  measurementId: "G-V6S5BWM6JR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;
