import React, { useEffect, useState } from 'react';
import { View , Text} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
function MyTask({navigation}) {
    return (
      <View >
          <Text>Create Group</Text>
      </View>
    );
  }
  function Groups({navigation}) {
    return (
      <View >
          <Text>Welcome</Text>
      </View>
    );
  }


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
           CheckCircleIcon
            ),
          }}/>
          <Tab.Screen
          name={"Groups"}
          component ={Groups}
          options={{
            tabBarLabel: 'Groups',
            tabBarIcon: ({ color }) => (
            <AntDesign name="home" color={'#FCCF3E'} size={23} />
            ),
          }}/>   
     
    </Tab.Navigator>
  );
}


export default Router;