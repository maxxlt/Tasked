import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../config/firebase";

const FirestoreUpdateGroup = (selectedGroupId, groupName) => {
  db.collection("groups").doc(selectedGroupId).update({
    group_name: groupName,
  });
};

export default FirestoreUpdateGroup;

const styles = StyleSheet.create({});
