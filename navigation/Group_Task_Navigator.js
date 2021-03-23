import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Group from "../components/Group";
import AntDesign from "react-native-vector-icons/AntDesign";
import MyTask from "../components/MyTask";
import Profile from "../components/Profile";
// create bottom tab navigation 
const Tab = createBottomTabNavigator();

const Group_Task_Navigator = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveBackgroundColor: "#646669",
        activeBackgroundColor: "#646669",
        activeTintColor: "#FFFFFF",
        inactiveTintColor: "#8B8B8B",
      }}
    >
      <Tab.Screen
        name={"HomeScreen"}
        component={MyTask}
        options={{
          tabBarLabel: "MyTask",
          tabBarIcon: ({ color }) => (
            <AntDesign name="checkcircle" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="Group"
        component={Group}
        options={{
          tabBarLabel: "Groups",
          tabBarIcon: ({ color }) => (
            <AntDesign name="appstore-o" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name={"Profile"}
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" color={color} size={23} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Group_Task_Navigator;
