import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";
import { createStore, combineReducers, compose } from "redux";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";
//configuring firebase backend
const firebaseConfig = {
  apiKey: "AIzaSyA3WP89ShzQhNK1-DZah22K-NmuifN95d8",
  authDomain: "tasked-1ced9.firebaseapp.com",
  projectId: "tasked-1ced9",
  storageBucket: "tasked-1ced9.appspot.com",
  messagingSenderId: "589135977048",
  appId: "1:589135977048:web:275baf1a76cf6f0572082d",
  measurementId: "G-TY1NPDKBG3",
};

const rrfConfig = {
  userProfile: "users",
};

let Firebase = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const db = firebase.firestore();

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const initialState = {};

export const store = createStore(rootReducer, initialState);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export const auth = firebase.auth();
export const arrayToUpdate = firebase.firestore.FieldValue;
// avoid deprecated warnings
db.settings({
  timestampsInSnapshots: true,
});

export default Firebase;
