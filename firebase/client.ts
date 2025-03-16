import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs4UO50L8BJju0HBm5xePHkcZOvK2Pdm0",
  authDomain: "native-dca3a.firebaseapp.com",
  projectId: "native-dca3a",
  storageBucket: "native-dca3a.firebasestorage.app",
  messagingSenderId: "578439357030",
  appId: "1:578439357030:web:30a1d1d588a567a06383a7",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, app, db };
