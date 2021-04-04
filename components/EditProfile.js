import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-ui-lib";
import colors from "../assets/color";
import { auth } from "../config/firebase";

const EditProfile = (props) => { //function which passes email, setEmail as props
    const [email, setEmail] = useState("");
    const submit = () => {
      auth
       /* .sendPasswordResetEmail(email)
        .then(() => { //if authentication passes, alert sent
          Alert.alert("Password reset link has been sent to: " + email);
        })
        .catch(() => {
          Alert.alert( //catch function if email does not exist
            "Email " + email + " does not exist. Please try different email."
          );
        });
      setEmail("");
      */
    };

  return (
    //Set up a pop-up screen for forgot password feature
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.x_btn_container}
        onPress={props.isModalVisible}
      >
        <Image style={styles.x_btn} source={require("../assets/x_btn.png")} />
      </TouchableOpacity>
      <View style={styles.title_container}>
        <Text style={styles.title_text}>EDIT PROFILE</Text>
      </View>
      <Text style={styles.label}>Username</Text>
      <KeyboardAvoidingView>
        <View style={styles.user_input_container}>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter new username to update"
            onChangeText={(email) => {
            //changeEmail(email);
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <Text style={styles.label}>Password</Text>
      <KeyboardAvoidingView>
        <View style={styles.user_input_container}>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter new password to update"
            onChangeText={(email) => {
            //changeEmail(email);
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
            //changeEmail();
          }}
          enableShadow
          center
        />
      </TouchableOpacity>
    </View>
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
  },
  x_btn_container: {
    height: 21,
    width: 21,
    alignSelf: "flex-end",
    marginTop: 21,
    marginRight: 21,
  },
});