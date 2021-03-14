import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  updateFullname,
  updateUsername,
  signup,
} from "../actions/User";
import { TextField, Button } from "react-native-ui-lib";
import colors from "../assets/color";
import { auth, db } from "../config/firebase";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const { navigation } = props;

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
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
  return (
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
        placeholder="Password"
        secureTextEntry={true}
        hideUnderline
      />
      <TextField
        style={styles.inputBox}
        value={username}
        onChangeText={(username) => setUsername(username)}
        placeholder="Username"
        autoCapitalize="none"
        hideUnderline
      />
      <TextField
        style={styles.inputBox}
        value={fullname}
        onChangeText={(fullname) => setFullname(fullname)}
        placeholder="Full Name"
        hideUnderline
      />
      <Button
        label={"Sign Up"}
        style={styles.button}
        onPress={register}
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
