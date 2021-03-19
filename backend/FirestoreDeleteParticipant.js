import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, arrayToUpdate } from "../config/firebase";

const FirestoreDeleteParticipant = (participantId, groupId) => {
  db.collection("groups")
    .doc(groupId)
    .update({
      participants: arrayToUpdate.arrayRemove(participantId),
    });
};

export default FirestoreDeleteParticipant;

const styles = StyleSheet.create({});
