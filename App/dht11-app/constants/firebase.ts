// constants/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDTVvERiIX_KCx2DTnSXD7obJlIpm8gdmc",
  authDomain: "esp32-4b84c.firebaseapp.com",
  databaseURL: "https://esp32-4b84c-default-rtdb.firebaseio.com",
  projectId: "esp32-4b84c",
  storageBucket: "esp32-4b84c.appspot.com",
  messagingSenderId: "477017398607",
  appId: "1:477017398607:web:3cdb1041869826d716ae40",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
