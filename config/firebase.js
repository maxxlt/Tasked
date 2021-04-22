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
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";

console.log(API_KEY);

//configuring firebase backend
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
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
