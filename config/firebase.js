import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA3WP89ShzQhNK1-DZah22K-NmuifN95d8",
  authDomain: "tasked-1ced9.firebaseapp.com",
  projectId: "tasked-1ced9",
  storageBucket: "tasked-1ced9.appspot.com",
  messagingSenderId: "589135977048",
  appId: "1:589135977048:web:275baf1a76cf6f0572082d",
  measurementId: "G-TY1NPDKBG3",
};

let Firebase = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const db = firebase.firestore();

// avoid deprecated warnings
db.settings({
  timestampsInSnapshots: true,
});

export default Firebase;
