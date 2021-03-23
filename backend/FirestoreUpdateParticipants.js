import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { arrayToUpdate, db } from "../config/firebase";
//update participants
const FirestoreUpdateParticipants = (newParticipantId, groupId) => {
  db.collection("groups")
    .doc(groupId)
    .update({
      participants: arrayToUpdate.arrayUnion(...[newParticipantId]),
    });
};

export default FirestoreUpdateParticipants;

const styles = StyleSheet.create({});
