import React,{useState} from 'react';

import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const AddTask = (props) => {
  const[taskTitle, setTaskTitle] = useState('New Task');
  const[completeBy, setCompleteBy] = useState('Set Date');
  const {navigation} = props;
 
  return (
    <View size={styles.container} >
        <Text style={styles.text1}>Task title:</Text>
        <TextInput
         style={styles.text}
         onChangeText={text => setTaskTitle(text)}
        />
         <Text style={styles.text1}>Complete By:</Text>
        <TextInput
         style={styles.text}
         onChangeText={text => setCompleteBy(text)}
        />
       
     
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      alignItems:"center"
  },
  textinput:{
    borderBottomWidth:1,
    
  }
});

export default AddTask;