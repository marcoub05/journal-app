import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI_ArK5EtMGEIliuE9gHd5X7iC4DBiwWQ",
  authDomain: "curso-react-d559d.firebaseapp.com",
  projectId: "curso-react-d559d",
  storageBucket: "curso-react-d559d.appspot.com",
  messagingSenderId: "857802308865",
  appId: "1:857802308865:web:2a23e7d347afbb10982f00"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
