import React, { useState, useEffect, useContext } from "react";
import Appbar from "./Appbar";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";

import { Context } from "../reducers/Store";
import FirestoreQueryInitials from "../backend/FirestoreQueryInitials";

import { db, auth } from "../config/firebase";
//Set up Profile Screen with username and fullname
const Profile = (props) => { //hook function in react to declare local variable for the state
  const [username, setUserName] = useState("");
  const [email, setFullName] = useState("");
  const [initial, setInitial] = useState("");
 
  const fireinitial = () => {
    db.collection("users").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        try {
          if (auth.currentUser.uid == documentSnapshot.data().uid)
          {
              const fullName  = documentSnapshot.data().fullname
              const i = fullName.charAt(0) + fullName.charAt(1)          
              setInitial(i.toUpperCase())
          }
        } catch (e) {
          console.log(e);
        }
      });
    });
    
  }
  useEffect(() => { //function that renders when component loads
    const username = auth.currentUser.displayName;
    const email = auth.currentUser.email;
    fireinitial()
    setUserName(username);
    setFullName(email); 
  }, [username]); 

  const { navigation } = props; //prop is an arguement passed
  return ( //styling and UI
    <View>
      <Appbar title="Profile" />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        
        <TouchableOpacity>
          <View style ={styles.profilePic}>
          <Text style= {{color:"white", fontWeight:"bold", fontSize:28}}>{initial}</Text>
          </View>
         
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
            //Logout of profile upon tapping logout button
            auth.signOut();
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.logOutbuttonText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    width: 110,
    height: 110,
    borderRadius: 55,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 30,
    backgroundColor:"#FCCF3E",
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    marginTop: 30,
    marginBottom: 15,
  },
  email: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    marginTop: 5,
  },
  editProfileButton: {
    marginTop: 25,
    marginBottom: 140,

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
