import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {withAuthenticator} from 'aws-amplify-react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {MyTask} from './Screens/MyTask';
import {Groups} from './Screens/Groups';


import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);


const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My Task" component={MyTask} />
      <Tab.Screen name="Groups" component={Groups} />
    </Tab.Navigator>
  );
}


export default withAuthenticator(App, { includeGreetings: true });
