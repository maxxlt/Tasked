import React from "react";
import * as firebase from "firebase";
import { StyleSheet, Text, View } from "react-native";
import { db, auth } from "../config/firebase";
//remove group from databae

const Deletegroup =( docid, groupId) => {
  var userref = db.collection("users").doc(docid)
  userref.update({
    "participated_groups": firebase.firestore.FieldValue.arrayRemove(groupId),
    
  })
  console.log("deleted");
}
const FirestoreDeleteGroup = (groupId) => {
  db.collection("groups")
    .doc(groupId)
    .delete()
    .then(() => {
      console.log("Delete successful");
    });
    db.collection("users").get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc) {
       Deletegroup(doc.id, groupId)
    });
  });
};

export default FirestoreDeleteGroup;

const styles = StyleSheet.create({});
