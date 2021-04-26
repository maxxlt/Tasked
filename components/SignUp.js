import React, { useState } from "react";
import * as Notifications from "expo-notifications";
import { StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import FirestoreQueryUser from "../backend/FirestoreQueryUser.js";

import { TextField, Button } from "react-native-ui-lib";
import colors from "../assets/color";
import { auth, db } from "../config/firebase";

//Set up fields for signup screen
const Signup = (props) => {
  //function which passes props as local variables to set current states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [queriedusername, setQueriedusername] = useState([]); //queriedusername stores what was fetched from firebase users into an array to validate
  const [fullname, setFullname] = useState("");
  const { navigation } = props;
  const [isPasswordValid, setPasswordValidation] = useState(false);
  const [isUsernameValid, setUsernameValidation] = useState(false);
  const [isFullnameValid, setFullnameValidation] = useState(false);
  const [initials, setInitials] = useState("");
  //Set up fields with the firebase database
  const register = () => {
    //function to register users
    auth
      .createUserWithEmailAndPassword(email, password) //passing in email and password as variable before authentication
      .then((authUser) => {
        authUser.user.updateProfile({
          uid: authUser.user.uid,
          email: email,
          displayName: username,
          fullname: fullname,
        });
        db.collection("users").doc(authUser.user.uid).set({
          uid: authUser.user.uid,
          email: email,
          username: username,
          fullname: fullname,
        });
        navigation.replace("Tasked");
      })
      .catch((error) => alert(error.message));
    setEmail("");
    setPassword("");
    setUsername("");
    setFullname("");
  };

  const onValidatePassword = (p) => {
    //function to ensure a password is valid: At least 8 characters long, 1 lowercase, 1 capital, 1 number, 1 special character => !@#$%^&*
    if (
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(
        p
      )
    ) {
      setPasswordValidation(true);
    } else {
      setPasswordValidation(false);
      Alert.alert(
        "Invalid Password",
        "Password must be 8 characters and contain: 1 lowercase letter, 1 capital letter, 1 number, and 1 special character.",
        [
          {
            text: "OK",
          },
        ]
      );
    }
  };

  const onCheckUsername = () => {
    //function to validate duplicate users
    if (queriedusername.length == 0) {
      setUsernameValidation(true);
    } else if (queriedusername.length > 0) {
      setUsernameValidation(false);
      Alert.alert("Username already exists", "Enter a different username", [
        {
          text: "OK",
        },
      ]);
    }
  };
  return (
    //UI styling
    <KeyboardAvoidingView behavior="padding">
      <TextField
        style={styles.inputBox}
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
        autoCapitalize="none"
        hideUnderline
        enableErrors
      />

      <TextField
        style={styles.inputBox}
        value={password}
        onChangeText={(password) => setPassword(password)}
        onBlur={async () => {
          onValidatePassword(password);
        }}
        placeholder="Password"
        secureTextEntry={true}
        hideUnderline
      />
      <TextField
        style={styles.inputBox}
        value={username}
        onChangeText={(username) => {
          setUsername(username);
        }}
        onBlur={async () => {
          setQueriedusername([]);
          await FirestoreQueryUser(username, setQueriedusername, setInitials);
          onCheckUsername();
        }}
        placeholder="Username"
        autoCapitalize="none"
        hideUnderline
      />
      <TextField
        style={styles.inputBox}
        value={fullname}
        onChangeText={(fullname) => setFullname(fullname)}
        onBlur={async () => {
          console.log(is)
          if (fullname.length >= 2) {
            setFullnameValidation(true);
          }
        }}
        placeholder="Full Name"
        hideUnderline
      />
      <Button
        label={"Sign Up"}
        style={styles.button}
        disabled={!(password.length && username.length && fullname.length)}
        onPress={async () => {
          register();
        }}
        backgroundColor={colors.logoorange}
        enableShadow
        center
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    width: "90%",
    paddingVertical: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    textAlign: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 120,
    alignItems: "center",
    borderColor: "#F6820D",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonSignup: {
    fontSize: 12,
  },
});

export default Signup;
