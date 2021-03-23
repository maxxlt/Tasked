import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, auth, arrayToUpdate } from "../config/firebase";
//Code to create a group in database
const FirestoreCreateGroup = (groupname, participantsids) => {
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
          participants: arrayToUpdate.arrayUnion(...participantsids),
        });
      for (let i = 0; i < participantsids.length; i++) {
        db.collection("users")
          .doc(participantsids[i])
          .update({
            participated_groups: arrayToUpdate.arrayUnion(docRef.id),
          });
      }
    });
};

export default FirestoreCreateGroup;

const styles = StyleSheet.create({});
