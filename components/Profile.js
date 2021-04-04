import React, { useState, useEffect } from "react";
import Appbar from "./Appbar";
import { View, StyleSheet, TouchableOpacity, Text, Image,   KeyboardAvoidingView} from "react-native";
import Modal from "react-native-modal";
import { auth } from "../config/firebase";
import EditProfile from "./EditProfile";

//Set up Profile Screen with username and fullname
const Profile = (props) => { //hook function in react to declare local variable for the state
  const [username, setUserName] = useState("");
  const [email, setFullName] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => { //function that renders when component loads
    const username = auth.currentUser.displayName;
    const email = auth.currentUser.email;
    setUserName(username);
    setFullName(email); 
  }, []); 

  //toggler for a popup
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const { navigation } = props; //prop is an arguement passed
  return ( //styling and UI
    <View>
      <Appbar title="Profile" />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity>
          <Image
            style={styles.profilePic}
            source={require("../assets/default_profile_pic.png")}
          />
        </TouchableOpacity>
        <Text style={styles.username}>@{username}</Text>
        <Text style={styles.email}>{email}</Text>
        <KeyboardAvoidingView>

        <Modal
          isVisible={isModalVisible}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
        >
          <EditProfile isModalVisible={toggleModal} />
        </Modal>
        </KeyboardAvoidingView>

        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={toggleModal}>
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
    width: 150,
    height: 150,
    borderRadius: 80,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 30,

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
