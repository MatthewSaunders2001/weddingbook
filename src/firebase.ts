import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCM86coB55J5rTDNr7XpursTdeEWszI66Q",
  authDomain: "our-roll.firebaseapp.com",
  projectId: "our-roll",
  storageBucket: "our-roll.firebasestorage.app",
  messagingSenderId: "1077022330376",
  appId: "1:1077022330376:web:aa4d968b76d60f9a118bbd",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);