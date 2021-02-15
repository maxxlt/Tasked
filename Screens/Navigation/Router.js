import React, { useEffect, useState } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MyTask from '../MyTask';
import Groups from '../Groups';
import Profile from '../Profile';
import AntDesign from 'react-native-vector-icons/AntDesign';



const Tab = createMaterialBottomTabNavigator()

const Router = (props) => {
 

  return (
    <Tab.Navigator 
    barStyle={{ backgroundColor: '#ffff' }}
    activeBackgroundColor="green"
    tabBarOptions={{
        activeTintColor:"#f15454",
              
    }}>
        <Tab.Screen
          name={"HomeScreen"}
          component ={MyTask}
          options={{
            tabBarLabel: 'MyTask',
            tabBarIcon: ({ color }) => (
         <AntDesign name="checkcircleo" color={'#FCCF3E'} size={23} />
            ),
          }}/>
          <Tab.Screen
          name={"Groups"}
          component ={Groups}
          options={{
            tabBarLabel: 'Groups',
            tabBarIcon: ({ color }) => (
            <AntDesign name="appstore-o" color={'#FCCF3E'} size={23} />
            ),
          }}/>   
          <Tab.Screen
          name={"Profile"}
          component ={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
            <AntDesign name="user" color={'#FCCF3E'} size={23} />
            ),
          }}/>   
    </Tab.Navigator>
  );
}


export default Router;