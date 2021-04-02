import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, arrayToUpdate } from "../config/firebase";

const FirestoreAddComment = (task, comment_body, uid, username) => {
  db.collection("comments")
    .add({
      comment_body: comment_body,
      comment_id: "",
      task_id: task.task_id,
      user_id: uid,
      timestamp: arrayToUpdate.serverTimestamp(),
      username: username,
    })
    .then((docRef) => {
      db.collection("comments").doc(docRef.id).update({
        comment_id: docRef.id,
      });
      db.collection("tasks")
        .doc(task.task_id)
        .update({
          comments: arrayToUpdate.arrayUnion(docRef.id),
        });
      db.collection("users")
        .doc(uid)
        .update({
          comments: arrayToUpdate.arrayUnion(docRef.id),
        });
    });
};

export default FirestoreAddComment;

const styles = StyleSheet.create({});
