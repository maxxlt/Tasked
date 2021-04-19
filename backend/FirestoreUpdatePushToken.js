import React from "react";
import { db, auth } from "../config/firebase";

const FirestoreUpdatePushToken = async (token) => {
  await db.collection("users").doc(auth.currentUser.uid).update({
    expoPushToken: token,
  });
};

export default FirestoreUpdatePushToken;
