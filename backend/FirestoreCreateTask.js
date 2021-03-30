import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, auth, arrayToUpdate } from "../config/firebase";
//Code to create a group in database
const FirestoreCreateTask = (taskname, participantsids) => {
  db.collection("tasks")
    .add({
      task_name: taskname,
      task_id: "",
      completed: false,
      participantsids: participantsids
    })
   
};

export default FirestoreCreateTask;

const styles = StyleSheet.create({});
