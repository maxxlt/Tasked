import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../config/firebase";
//update group
const FirestoreUpdateGroup = (selectedGroupId, groupName) => { //function to update groupnames
  db.collection("groups").doc(selectedGroupId).update({
    group_name: groupName,
  });
};

export default FirestoreUpdateGroup;

const styles = StyleSheet.create({});
