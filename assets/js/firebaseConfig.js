import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDk6De_UjRzK3w2yohBUEL61I9KsW3imZU",
  authDomain: "resume-analyzer-11c6c.firebaseapp.com",
  projectId: "resume-analyzer-11c6c",
  storageBucket: "resume-analyzer-11c6c.appspot.com", // 🔥 fixed .app to .appspot.com
  messagingSenderId: "560326718608",
  appId: "1:560326718608:web:08847d5eed9a7dcbb3d415",
  measurementId: "G-G18FK7B3J5",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to the Firestore document
const counterRef = doc(db, "counters", "views");

async function updateAndDisplayCount() {
  try {
    const snap = await getDoc(counterRef);

    // 🧱 If document doesn't exist, create it with count = 1
    if (!snap.exists()) {
      await setDoc(counterRef, { count: 1 });
      document.getElementById("view-count").innerText = 1;
    } else {
      // 🔁 Increment the existing count
      await updateDoc(counterRef, {
        count: increment(1),
      });

      // Read the updated value
      const updatedSnap = await getDoc(counterRef);
      document.getElementById("view-count").innerText =
        updatedSnap.data().count;
    }
  } catch (err) {
    console.error("Error updating counter:", err);
    document.getElementById("view-count").innerText = "Error!";
  }
}

// Run when window loads
window.addEventListener("load", updateAndDisplayCount);
