import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db, auth, arrayToUpdate } from "../config/firebase";
//query users
const FirestoreQueryUser = async (keyword, setQueriedUsers) => { //function to validate against queried array from firestore
  await db
    .collection("users")
    .where("username", "==", keyword) //validating if equals keyword entered by user
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        const docData = { ...doc.data(), id: doc.id };
        setQueriedUsers([...[docData]]); //storing into array
      });
    });
};

export default FirestoreQueryUser;

const styles = StyleSheet.create({});
