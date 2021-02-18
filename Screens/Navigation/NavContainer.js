import React from 'react';
import { View, StyleSheet } from 'react-native';
import Router from './Router';
import { NavigationContainer } from '@react-navigation/native';

const NavContainer = (props) => {
  return (
    <NavigationContainer>
      <Router/>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {}
});

export default NavContainer;