import React from "react";
import { db, auth } from "../config/firebase";
import { StyleSheet, Text, View } from "react-native";

const FirestoreQueryAllTasks = (setTasks, groupid, setLoading) => {
  return db.collection("tasks").onSnapshot((querySnapshot) => {
    const task = [];
    // Only query the groups that user is participated in
    querySnapshot.forEach((documentSnapshot) => {
      try {
        if (groupid == documentSnapshot.data().group.group_id){
          task.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        }
      } catch (e) {
        console.log(e);
      }
    });
    setTasks(task);
    setLoading(false);
  });
};

export default FirestoreQueryAllTasks;

const styles = StyleSheet.create({});
