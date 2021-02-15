import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';



const MyTask =() => {
  return (
    <View >
        <Text>Welcome</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:"center"
  }
});

export default MyTask;