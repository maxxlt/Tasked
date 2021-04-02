import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, arrayToUpdate } from "../config/firebase";

const FirestoreAddComment = (
  task,
  comment_body,
  uid,
  username,
  setComments
) => {
  const comment = {
    comment_body: comment_body,
    task_id: task.task_id,
    user_id: uid,
    creation_in_ms: new Date().getTime(),
    creation_date: new Date().toDateString(),
    creation_time: new Date().toTimeString(),
    username: username,
  };
  db.collection("tasks")
    .doc(task.task_id)
    .update({
      comments: arrayToUpdate.arrayUnion(comment),
    });
  setComments((comments) => [
    ...comments, //add to the end of the list
    comment,
  ]);
};

export default FirestoreAddComment;

const styles = StyleSheet.create({});
