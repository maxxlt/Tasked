import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { db } from '../config/firebase'

const FirestoreUpdateTaskChecked = (check, task) => {
    if (!check){
        db.collection("tasks").doc(task.item.task_id).update({
            is_complete: true,
          });
    }
    else {
        db.collection("tasks").doc(task.item.task_id).update({
            is_complete: false,
          });
    }
}

export default FirestoreUpdateTaskChecked

const styles = StyleSheet.create({})
