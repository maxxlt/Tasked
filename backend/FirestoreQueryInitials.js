
import { db, auth } from "../config/firebase";
import { StyleSheet, Text, View } from "react-native";
let initial = ''
const FirestoreQueryInitials = (userId) => {
 db.collection("users").onSnapshot((querySnapshot) => {

    querySnapshot.forEach((documentSnapshot) => {
      try {
        if (userId == documentSnapshot.data().uid)
        {
            const fullName  = documentSnapshot.data().fullname
            initial = fullName.charAt(0) + fullName.charAt(1)
           
          
           
        }
      } catch (e) {
        console.log(e);
      }
    });
   
  });
  return initial.toUpperCase() 
};

export default FirestoreQueryInitials;

const styles = StyleSheet.create({});