import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../config/firebase";

const FirestoreQueryAllParticipants = (
  participantsids,
  setQueriedParticipants
) => {
  return db.collection("users").onSnapshot((querySnapshot) => {
    const users = [];
    querySnapshot.forEach((documentSnapshot) => {
      try {
        if (participantsids.includes(documentSnapshot.data().uid)) {
          users.push({ ...documentSnapshot.data(), key: documentSnapshot.id });
        }
      } catch (e) {
        console.log(e);
      }
    });
    setQueriedParticipants(users);
  });
};

export default FirestoreQueryAllParticipants;

const styles = StyleSheet.create({});
