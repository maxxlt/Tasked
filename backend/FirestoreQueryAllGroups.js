import React from "react";
import { db, auth } from "../config/firebase";
import { StyleSheet, Text, View } from "react-native";

const FirestoreQueryAllGroups = (setGroups, setLoading) => {
  return db.collection("groups").onSnapshot((querySnapshot) => {
    const group = [];
    // Only query the groups that user is participated in
    querySnapshot.forEach((documentSnapshot) => {
      try {
        for (let j = 0; j < documentSnapshot.data().participants.length; j++) {
          if (auth.currentUser.uid == documentSnapshot.data().participants[j]) {
            group.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
    setGroups(group);
    setLoading(false);
  });
};

export default FirestoreQueryAllGroups;

const styles = StyleSheet.create({});
