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
  const [username, setUsername] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.email);
  const [fullname, setFullName] = useState(props.user.fullname);

  const submit = () => {
    console.log(auth.currentUser);
    auth.currentUser.updateProfile({
      displayName: username,
    });
    props.setUserName(username);
    db.collection("users").doc(props.user.uid).update({
      username: username,
      fullname: fullname,
    });
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
        <View style={styles.input_container}>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter old email to validate"
            value={props.user.email}
            editable={false}
            onChangeText={(email) => {
              setEmail(email);
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <Text style={styles.label}>Username</Text>
      <KeyboardAvoidingView>
        <View style={styles.input_container}>
          <TextInput
            style={styles.inputBox}
            value={username}
            placeholder="Enter new username to update"
            onChangeText={(username) => {
              setUsername(username);
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <Text style={styles.label}>Fullname</Text>
      <KeyboardAvoidingView>
        <View style={styles.input_container}>
          <TextInput
            style={styles.inputBox}
            value={fullname}
            placeholder="Enter fullname"
            onChangeText={(fullname) => {
              setFullName(fullname);
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
            props.isModalVisible();
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
    marginTop: 15,
  },
  inputBox: {
    marginHorizontal: 18,
    paddingVertical: 15,
    fontSize: 16,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  input_container: {
    marginTop: 12,
    height: 52,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  button: {
    alignItems: "center",
    borderColor: "#F6820D",
    borderRadius: 5,
    marginTop: 26,
    marginHorizontal: 33,
  },
  x_btn_container: {
    height: 21,
    width: 21,
    alignSelf: "flex-end",
    marginTop: 21,
    marginRight: 21,
  },
});
