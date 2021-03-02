import * as React from 'react';
import {   Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTask from '../components/MyTask';
import Group from '../components/Group';
import { createAppContainer } from 'react-navigation';


const Router = createBottomTabNavigator({
    Home: MyTask,
    Group: Group,
  });

export default createAppContainer(Router);