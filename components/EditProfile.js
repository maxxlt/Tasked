import React, { useState } from "react";
import { Alert } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button } from "react-native-ui-lib";
import colors from "../assets/color";
import { auth, db } from "../config/firebase";

const EditProfile = (props) => {
  //function which passes email, setEmail as props
  const [Newemail, setNewEmail] = useState("");
  const [Newusername, setNewUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    auth //passing in email and password as variable before authentication
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateEmail(Newemail);
        authUser.user.updateProfile({ username: Newusername });
        db.collection("users").doc(authUser.user.uid).update({
          email: Newemail,
          username: Newusername,
        });
        // navigation.replace("Tasked");
      })
      .catch((error) => alert(error.message));
    setNewEmail("");
    setNewUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    //Set up a pop-up screen for forgot password feature
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.x_btn_container}
        onPress={props.isModalVisible}
      >
        <Image style={styles.x_btn} source={require("../assets/x_btn.png")} />
      </TouchableOpacity>
      <View style={styles.title_container}>
        <Text style={styles.title_text}>EDIT PROFILE</Text>
      </View>
      <Text style={styles.label}>Current Email</Text>
      <KeyboardAvoidingView>
        <View style={styles.email_input_container}>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter old email to validate"
            onChangeText={(email) => {
              setEmail(email);
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <Text style={styles.label}>Current Password</Text>
      <KeyboardAvoidingView>
        <View style={styles.email_input_container}>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter old pass to validate"
            onChangeText={(password) => {
              setPassword(password);
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <Text style={styles.label}>New Email</Text>
      <KeyboardAvoidingView>
        <View style={styles.email_input_container}>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter new email to update"
            onChangeText={(Newemail) => {
              setNewEmail(Newemail);
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <Text style={styles.label}>New Username</Text>
      <KeyboardAvoidingView>
        <View style={styles.user_input_container}>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter new username to update"
            onChangeText={(Newusername) => {
              setNewUsername(Newusername);
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity>
        <Button
          label={"Submit"}
          style={styles.button}
          backgroundColor={colors.logoorange}
          onPress={() => {
            submit();
          }}
          enableShadow
          center
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    width: "100%",
    marginBottom: 50,
    borderRadius: 5,
  },
  title_container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  title_text: {
    fontSize: 24,
  },
  label: {
    fontSize: 16,
    marginLeft: 20,
    marginTop: 45,
  },
  inputBox: {
    marginHorizontal: 18,
    paddingVertical: 15,
    fontSize: 16,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  user_input_container: {
    marginTop: 20,
    height: 52,
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  button: {
    alignItems: "center",
    borderColor: "#F6820D",
    borderRadius: 5,
    marginTop: 40,
    marginHorizontal: 33,
    marginBottom: 21,
  },
  x_btn_container: {
    height: 21,
    width: 21,
    alignSelf: "flex-end",
    marginTop: 21,
    marginRight: 21,
  },
});
