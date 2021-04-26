import React from "react";
import { db } from "../config/firebase";
import { sendPushNotification } from "./Notification";

const FirestoreNotifyUser = (task) => {
  db.collection("tasks")
    .doc(task.task_id)
    .get()
    .then((querySnapshot) => {
      user = querySnapshot.data().assigned_user;
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((querySnapshot) => {
          token = querySnapshot.data().expoPushToken;
          sendPushNotification(token, task);
        });
    });
};

export default FirestoreNotifyUser;
