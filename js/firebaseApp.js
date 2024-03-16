// firebaseApp.js
import { firebaseConfig } from './firebaseConfig.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const dbRef = ref(db, "flower");
console.log(dbRef);