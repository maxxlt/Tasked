import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, auth, arrayToUpdate } from "../config/firebase";

const FirestoreEditTask = (task_id, new_taskname, assigneduser = {}, date) => {
  db.collection("tasks")
    .doc(task_id)
    .update({
      task_name: new_taskname,
      assigned_user: assigneduser,
      due_date: date.toDateString(),
      due_time: date.toTimeString().split(" ", 1)[0], //eliminate timezone
    });
};

export default FirestoreEditTask;

const styles = StyleSheet.create({});
