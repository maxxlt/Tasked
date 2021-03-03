import React, {useState, useEffect} from "react";
import { StyleSheet, Image } from "react-native";

import Firebase from "../config/firebase";
import colors from "../assets/color";
import SignUp from "./SignUp";
import Login from "./Login";
import {
  View,
  TabBar,
  Text,
  Typography,
  ThemeManager,
} from "react-native-ui-lib";
const Landing = (props) => {
  const [tab, setTab] = useState(0);
     Typography.loadTypographies({
      welcomeText: { fontSize: 32, paddingBottom: 10, fontWeight: "100" },
    });
    return (
      <View style={styles.container}>
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
          indicatorStyle={{ backgroundColor: colors.orange }}
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
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
  },
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
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
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
