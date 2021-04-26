import React, { useState } from "react";
import { StyleSheet, Image, KeyboardAvoidingView } from "react-native";

import Colors from "../assets/color";
import SignUp from "./SignUp";
import Login from "./Login";
import { TabBar, Text, Typography } from "react-native-ui-lib";

//first page once app loads
const Landing = (props) => {
  const [tab, setTab] = useState(0); //switch between login and signup
  Typography.loadTypographies({
    welcomeText: { fontSize: 32, paddingBottom: 10, fontWeight: "100" },
  });
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/img/android/logo-black-text.png")}
      />
      <Text welcomeText style={styles.welcomeText}>
        WELCOME
      </Text>
      <TabBar
        style={styles.tabbar}
        enableShadow={false}
        indicatorStyle={{ backgroundColor: Colors.orange }}
      >
        <TabBar.Item
          label="Login"
          onPress={() => {
            setTab(0);
          }}
        />
        <TabBar.Item
          label="Sign Up"
          onPress={() => {
            setTab(1);
          }}
        />
      </TabBar>
      {tab === 0 ? (
        <Login navigation={props.navigation} />
      ) : (
        <SignUp navigation={props.navigation} />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: Colors.lightGrey,
    borderBottomWidth: 1,
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: Colors.pumpkinOrange,
    borderColor: Colors.pumpkinOrange,
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  },
  buttonSignup: {
    fontSize: 12,
  },
  logo: {
    width: 150,
    height: 150,
  },
  tabbar: {
    marginVertical: 10,
  },
});

export default Landing;
