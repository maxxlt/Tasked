import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, auth, arrayToUpdate } from "../config/firebase";
//Code to create a group in database
const FirestoreCreateTask = (taskname, assigneduser = {}, date, group) => {
  db.collection("tasks")
    .add({
      group: group,
      task_name: taskname,
      task_id: "",
      is_complete: false,
      assigned_user: assigneduser,
      comments: [],
      due_date: date.toDateString(),
      due_time: date.toTimeString().split(" ", 1)[0], //eliminate timezone
    })
    .then((docRef) => {
      db.collection("tasks").doc(docRef.id).update({
        task_id: docRef.id,
      });
      db.collection("groups")
        .doc(group.group_id)
        .update({
          tasks: arrayToUpdate.arrayUnion(docRef.id),
        });
      db.collection("users")
        .doc(assigneduser.id)
        .update({
          tasks: arrayToUpdate.arrayUnion(docRef.id),
        });
    });
};

export default FirestoreCreateTask;

const styles = StyleSheet.create({});
