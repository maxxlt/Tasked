import React from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Landing from "../components/Landing";
import Group_Task_Navigator from "./Group_Task_Navigator";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CreateGroup from "../components/CreateGroup";
import GroupTask from "../components/GroupTask";

const Stack = createStackNavigator();

//Navigator to switch screens based on what the user taps
const Navigator = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Tasked" component={Group_Task_Navigator} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen name="GroupTask" component={GroupTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
