import React from "react";
import { db,  } from "../config/firebase";
import { StyleSheet} from "react-native";

const FirestoreQueryMyTasks = (setTasks, userid, setLoading) => {
  return db.collection("tasks").onSnapshot((querySnapshot) => {
    const task = [];
    // Only query the groups that user is participated in
    querySnapshot.forEach((documentSnapshot) => {
      try {
        if (userid == documentSnapshot.data().assigned_user.id)
        {
          task.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        
        }
      } catch (e) {
        console.log(e);
      }
    });
    setTasks(task);
    setLoading(false);
  });
};

export default FirestoreQueryMyTasks;

const styles = StyleSheet.create({});
