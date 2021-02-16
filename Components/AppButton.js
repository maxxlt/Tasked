import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const AppButton = (props) => {
  return (
   
    <View style={styles.container}>
        <Text style = {styles.word}>{props.text}</Text>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor : "#FCCF3E",
      padding:15,
      alignItems:"center",
      borderRadius:10,
      marginLeft:100,
      marginRight:100

  },
  word:{
    color: "#ffffff",
    alignContent:"center",
    shadowColor:"black",
    shadowOpacity:100,
    fontSize:22,
    fontWeight:"bold"
  }
});

export default AppButton;