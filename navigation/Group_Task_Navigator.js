import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Group from "../components/Group";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyTask from '../components/MyTask';
import Profile from "../components/Profile";

const Tab = createBottomTabNavigator();

const Group_Task_Navigator = (props) => {
  return (
    
      <Tab.Navigator >
      <Tab.Screen
          name={"HomeScreen"}
          component ={MyTask}
          options={{
          tabBarLabel: 'MyTask',
          tabBarIcon: ({ color }) => (
         <AntDesign name="checkcircleo" color={'#FCCF3E'} size={23} />
            ),
          }}/>
        <Tab.Screen name="Group" component={Group} options={{
          tabBarLabel: 'Groups',
          tabBarIcon: ({ color }) => (
          <AntDesign name="appstore-o" color={'#FCCF3E'} size={23} />
            ),
          }} />
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
};
export default Group_Task_Navigator;
