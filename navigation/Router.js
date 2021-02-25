import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Group from '../components/Group';
import React from "react";
import Task from '../components/Task';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Profile from '../components/Profile';

const Tab = createBottomTabNavigator();

const  Router = (props) => {
  return (
      
       <Tab.Navigator>
       <Tab.Screen
          name={"Task"}
          component ={Task}
          options={{
          tabBarLabel: 'Task',
          tabBarIcon: ({ color }) => (
         <AntDesign name="checkcircleo" color={'#FCCF3E'} size={23} />
            ),
          }}/>
       <Tab.Screen
          name={"Groups"}
          component ={Group}
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