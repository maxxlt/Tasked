import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../config/firebase";

const FirestoreDeleteGroup = (groupId) => {
  db.collection("groups")
    .doc(groupId)
    .delete()
    .then(() => {
      console.log("Delete successful");
    });
};

export default FirestoreDeleteGroup;

const styles = StyleSheet.create({});
