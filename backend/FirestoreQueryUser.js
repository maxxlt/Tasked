import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, auth, arrayToUpdate } from "../config/firebase";

const FirestoreQueryUser = async (keyword, setQueriedUsers) => {
  await db
    .collection("users")
    .where("username", "==", keyword)
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        const docData = { ...doc.data(), id: doc.id };
        setQueriedUsers([...[docData]]);
      });
    });
};

export default FirestoreQueryUser;

const styles = StyleSheet.create({});
