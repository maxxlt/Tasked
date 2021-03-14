import React, { useState, useEffect } from "react";
import Appbar from "./Appbar";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
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
      <TouchableOpacity>
          <Image
            style={styles.profilePic}
            source={require("../assets/default_profile_pic.png")}
          />
      </TouchableOpacity>
      <Text style={styles.username}>@{username}</Text>
      <Text style={styles.email}>{email}</Text>
      <TouchableOpacity
        style={styles.editProfileButton}
        onPress={() => {
          //auth.signOut();
          //navigation.navigate("Home");
        }}
      >
        <Text style={styles.editProfileButtonText}>EDIT PROFILE</Text>
      </TouchableOpacity>
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
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 80,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 30,
    marginRight: 112,
    marginLeft: 135,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    marginTop: 30,
    marginBottom: 15,
    marginLeft: 170,
    marginRight: 110,
  },
  email: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    marginTop: 5,
    marginLeft: 120,
    marginRight: 60,
  },
  editProfileButton: {
    marginTop: 25,
    marginBottom: 140,
    marginLeft: 107,
    marginRight: 32,
    alignItems: "center",
    backgroundColor: "#646669",
    borderColor: "#646669",
    borderWidth: 1,
    borderRadius: 5,
    height: 36,
    width: 208,
  },
  editProfileButtonText: {
    marginTop: 8,
    fontSize: 13,
    height: 20,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logOutbutton: {
    marginTop: 120,
    marginBottom: 140,
    marginLeft: 55,
    marginRight: 32,
    alignItems: "center",
    backgroundColor: "#FFC038",
    borderColor: "#FFC038",
    borderWidth: 1,
    borderRadius: 5,
    height: 52,
    width: 300,
  },
  logOutbuttonText: {
    marginTop: 12,
    fontSize: 20,
    height: 22,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Profile;
