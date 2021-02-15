import React from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Group_List from '../Components/Group_List';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
    title: 'Group 1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f631',
    title: 'Group 2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d721',
    title: 'Group 3',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7221',
    title: 'Group 4',
  },

]; 

const Groups = () => {
  return (
    <View size={styles.container} >
        <Group_List Data = {DATA}/>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
      flex:1,
      alignItems:"center"
  }
});

export default Groups;