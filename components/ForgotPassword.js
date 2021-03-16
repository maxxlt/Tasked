import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-ui-lib";
import colors from "../assets/color";
import {auth} from "../config/firebase";

const ForgotPassword = (props) => {
    const [email, setEmail] = useState("");
    const submit = () => {
        auth
        .sendPasswordResetEmail(email)
        .then(() => {
            Alert.alert("Password reset link has been sent to: "+ email);
        })
        .catch(() => {Alert.alert(email)})
        setEmail("");
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.x_btn_container}
        onPress={props.isModalVisible}
      >
        <Image style={styles.x_btn} source={require("../assets/x_btn.png")} />
      </TouchableOpacity>
      <View style={styles.title_container}>
        <Text style={styles.title_text}>Forgot Password</Text>
      </View>
      <Text style={styles.label}>Email</Text>
      <KeyboardAvoidingView>
        <View style={styles.email_input_container}>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter existing email"
            onChangeText={(email) => {
              setEmail(email);
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity>
      <Button
        label={"Submit"}
        style={styles.button}
        backgroundColor={colors.logoorange}
        onPress={() => {submit()}}
        enableShadow
        center
      />
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

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
  email_input_container: {
    marginTop: 12,
    height: 52,
    borderRadius: 5,
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