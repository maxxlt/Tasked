import React, {useState, useEffect} from "react";
import Appbar from './Appbar';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { auth } from "../config/firebase";
const Profile = (props) => {
  const[username, setUserName] = useState('');
 
  useEffect(()=>{
    const user = auth.currentUser.displayName;
    setUserName(user);
    console.log(user)
  },[])
  
 const {navigation} = props;
  return (
    <View>
       <Appbar title="Profile"/>
      <Text>HELLO {username}</Text>
      <TouchableOpacity
            style={styles.button}
            onPress={() => {
              auth.signOut();
              navigation.navigate("Home");
            }}
          >
          <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles =StyleSheet.create({
 
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#F6820D",
    borderColor: "#F6820D",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
});
export default Profile;
