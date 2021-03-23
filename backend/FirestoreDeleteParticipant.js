import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, arrayToUpdate } from "../config/firebase";
//remove group id
const FirestoreDeleteParticipant = (participantId, groupId) => {
  db.collection("groups")
    .doc(groupId)
    .update({
      participants: arrayToUpdate.arrayRemove(participantId),
    });
  db.collection("users")
    .doc(participantId)
    .update({
      participated_groups: arrayToUpdate.arrayRemove(groupId),
    });
};

export default FirestoreDeleteParticipant;

const styles = StyleSheet.create({});
