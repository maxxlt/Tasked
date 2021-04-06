
import { db, auth } from "../config/firebase";
import { StyleSheet, Text, View } from "react-native";

const FirestoreQueryInitials = (setInitial, userId) => {
 return db.collection("users").onSnapshot((querySnapshot) => {

    querySnapshot.forEach((documentSnapshot) => {
      try {
        if (userId == documentSnapshot.data().uid)
        {
            const fullName  = documentSnapshot.data().fullname.split(' ') 
            const initial = fullName.shift().charAt(0) + fullName.shift().charAt(1)
           
            setInitial(initial.toUpperCase() )
           
        }
      } catch (e) {
        console.log(e);
      }
    });
   
  });
};

export default FirestoreQueryInitials;

const styles = StyleSheet.create({});