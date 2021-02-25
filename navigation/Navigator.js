import React from "react";

import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Landing from "../components/Landing";
import Router from "./Router";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Navigator = (props) => {
  return (
    <NavigationContainer
  
    >
    <Stack.Navigator
    >
      <Stack.Screen name="LoginSignUp"  component={Landing} />
      <Stack.Screen name="Tasked" component={Router} 
      options={{
        headerLeft: null, 
      }

      }/>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
