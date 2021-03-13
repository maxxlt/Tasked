import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, auth, arrayToUpdate } from "../config/firebase";

const FirestoreCreateGroup = (groupname) => {
  db.collection("groups")
    .add({
      group_name: groupname,
      group_id: "",
    })
    .then((docRef) => {
      db.collection("groups")
        .doc(docRef.id)
        .update({
          group_id: docRef.id,
          participants: arrayToUpdate.arrayUnion(auth.currentUser.uid),
        });
      db.collection("users")
        .doc(auth.currentUser.uid)
        .update({
          participated_groups: arrayToUpdate.arrayUnion(docRef.id),
        });
    });
};

export default FirestoreCreateGroup;

const styles = StyleSheet.create({});
