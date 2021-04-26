import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, arrayToUpdate } from "../config/firebase";

const FirestoreDeleteTask = (task) => {
  db.collection("tasks")
    .doc(task.task_id)
    .delete()
    .then(() => {
      console.log("Delete task successful");
    });
  //delete from groups tasks list
  db.collection("groups")
    .doc(task.group.group_id)
    .update({
      tasks: arrayToUpdate.arrayRemove(task.task_id),
    });
  //if some user assigned to this task
  if (task.assigned_user != null || task.assigned_user != undefined) {
    db.collection("users")
      .doc(task.assigned_user.id)
      .update({
        tasks: arrayToUpdate.arrayRemove(task.task_id),
      });
  }
};

export default FirestoreDeleteTask;

const styles = StyleSheet.create({});
