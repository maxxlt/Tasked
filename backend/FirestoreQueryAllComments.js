import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../config/firebase";

const FirestoreQueryAllComments = (task, setComments, setLoading) => {
  //if there is anything to query
  if (!task.comments) {
    db.collection("tasks")
      .doc(task.task_id)
      .get()
      .then((documentSnapshot) => {
        setComments(documentSnapshot.data().comments);
      });
  }

  setLoading(false);
  return console.log("Query complete");
};

export default FirestoreQueryAllComments;

const styles = StyleSheet.create({});
