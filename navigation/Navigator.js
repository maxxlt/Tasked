import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Group from "../components/Group";

const Navigator = createSwitchNavigator(
  {
    Login: {
      screen: Login,
    },
    SignUp: {
      screen: SignUp,
    },
    Group: {
      screen: Group,
    },
  },
  {
    initialRouteName: "Login",
  }
);

export default createAppContainer(Navigator);
