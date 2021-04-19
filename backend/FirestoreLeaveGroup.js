import React from "react";
import * as firebase from "firebase";
import { StyleSheet, Text, View } from "react-native";
import { db,auth } from "../config/firebase";
//remove user from databae
const FirestoreLeaveGroup = (groupId) => {
    
  var groupref =db.collection("groups").doc(groupId)
    
    groupref.update({
        "participants": firebase.firestore.FieldValue.arrayRemove(auth.currentUser.uid),
        
    })

    var userref =db.collection("users").doc(auth.currentUser.uid)
    
    userref.update({
        "participated_groups": firebase.firestore.FieldValue.arrayRemove(groupId),
        
    })
};

export default FirestoreLeaveGroup;

const styles = StyleSheet.create({});
