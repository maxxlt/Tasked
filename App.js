import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {withAuthenticator} from 'aws-amplify-react-native';




import Amplify from 'aws-amplify';
import config from './aws-exports';
import Router from './Screens/Navigation/Router';
import { NavigationContainer } from '@react-navigation/native';
Amplify.configure(config);




const App = () => {
  return (
    <NavigationContainer>
      <Router/>

    </NavigationContainer>
        );
}


export default withAuthenticator(App, { includeGreetings: true });
