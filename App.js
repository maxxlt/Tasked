import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {withAuthenticator} from 'aws-amplify-react-native';

import Amplify from 'aws-amplify';
import config from ;
Amplify.configure(config);

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Tasked</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
