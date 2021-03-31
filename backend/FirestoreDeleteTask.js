import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { db} from "../config/firebase";

const FirestoreDeleteTask = (taskid) => {
    db.collection("tasks")
    .doc(taskid)
    .delete()
    .then(() => {
      console.log("Delete task successful");
    });
}

export default FirestoreDeleteTask

const styles = StyleSheet.create({})
