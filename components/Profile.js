import React, { useState, useEffect } from "react";
import Appbar from "./Appbar";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { auth, db } from "../config/firebase";
const Profile = (props) => {
  const [username, setUserName] = useState("");
  const [email, setFullName] = useState("");

 /* useEffect(() => {
    const username = auth.currentUser.displayName;
    const fullname = db.collection("users").doc(authUser.user.uid).get({fullname: fullname,});
    setUserName(username);
    setFullName(fullname);
    //console.log(auth.currentUser); 
  }, []);
*/
  useEffect(() => {
    const username = auth.currentUser.displayName;
    const email = auth.currentUser.email;
    //const fullname = db.collection("users").doc(db.user.fullname); //* NEED TO GET fullname FROM DB */
    setUserName(username);
    setFullName(email); //pass "fullname" here eventually
    //console.log(auth.currentUser); 
  }, []);

  const { navigation } = props;
  return (
    <View>
      <Appbar title="Profile" />
      <Text style={styles.username}>@{username}</Text>
      <Text style={styles.email}>{email}</Text>
      <TouchableOpacity
        style={styles.logOutbutton}
        onPress={() => {
          auth.signOut();
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.logOutbuttonText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  username: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 210,
    marginBottom: 15,
    marginLeft: 160,
    marginRight: 110,
  },
  email: {
    paddingLeft: 15,
    paddingRight: 15,
   // paddingTop: 15,
    paddingBottom: 15,
    marginTop: 5,
  //  marginBottom: 20,
    marginLeft: 120,
    marginRight: 60,
  },
  logOutbutton: {
    marginTop: 250,
    marginBottom: 140,
    marginLeft: 55,
    marginRight: 32,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#FFC038",
    borderColor: "#FFC038",
    borderWidth: 1,
    borderRadius: 5,
    height: 52,
    width: 300,
  },
  logOutbuttonText: {
    fontSize: 20,
    height: 22,
    color: "white",
    alignItems: "center",
  },
});
export default Profile;
