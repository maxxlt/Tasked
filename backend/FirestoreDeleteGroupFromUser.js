import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../config/firebase";
//remove group from databae
const FirestoreDeleteGroup = (groupId) => {
  db.collection("users")
    .doc(uid)
    .field(participated_groups)
    .delete(groupId)
    .then(() => {
      console.log("Delete successful");
    });
};

export default FirestoreDeleteGroup;

const styles = StyleSheet.create({});
