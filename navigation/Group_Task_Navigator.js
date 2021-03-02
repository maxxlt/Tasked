import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Group from "../components/Group";
import Dummy from "../components/Dummy";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Group" component={Group} tabBarIcon={} />
        <Tab.Screen name="Settings" component={Dummy} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default MyTabs;
