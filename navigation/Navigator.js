import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Group from "../components/Group";
import Landing from "../components/Landing";
import Group_Task_Navigator from "./Group_Task_Navigator";
const Navigator = createSwitchNavigator(
  {
    Landing: {
      screen: Landing,
    },
    Login: {
      screen: Login,
    },
    SignUp: {
      screen: SignUp,
    },
    Group: {
      screen: Group,
    },
    Group_Task_Navigator: {
      screen: Group_Task_Navigator,
    },
  },
  {
    initialRouteName: "Landing",
  }
);

export default createAppContainer(Navigator);
