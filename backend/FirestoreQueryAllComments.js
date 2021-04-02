import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../config/firebase";

const FirestoreQueryAllComments = (task, setComments) => {
  console.log(task.comments);
  return db.collection("comments").onSnapshot((querySnapshot) => {
    const comments = [];
    // Only query the comments
    querySnapshot.forEach((documentSnapshot) => {
      try {
        for (let j = 0; j < task.comments.length; j++) {
          if (task.comments[j] == documentSnapshot.data().comment_id) {
            comments.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
    setComments(comments);
  });
};

export default FirestoreQueryAllComments;

const styles = StyleSheet.create({});
