import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { initializeFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBkpDkVPL6iMcI-yaK3y47Bm8WGz8mNrjM",
  authDomain: "clone-wpp-wof.firebaseapp.com",
  projectId: "clone-wpp-wof",
  storageBucket: "clone-wpp-wof.appspot.com",
  messagingSenderId: "776795834858",
  appId: "1:776795834858:web:248167602ce049aa394a93"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {experimentalForceLongPolling: true});