import React from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Group from "../components/Group";
import Landing from "../components/Landing";
import Group_Task_Navigator from "./Group_Task_Navigator";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CreateGroup from "../components/CreateGroup";

const Stack = createStackNavigator();

const Navigator = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Tasked" component={Group_Task_Navigator} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
