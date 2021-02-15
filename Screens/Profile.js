import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const  Profile = (props) => {
  return (
    <View style={styles.container}>
       <Image style ={styles.profileimg} source={require('../assets/profile_ig.jpg')}></Image>
        <Text>Krishna Khadka</Text>
      <Image style={styles.img} source={require('../assets/orange-wave.png')}>
       
      </Image>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:"center",
    alignContent:"center"
    
  },
  img:{
    width:400,
    height:210,  
    
  },
  profileimg:{
    width:100,
    height:100,
    borderRadius:50,
    marginTop:10
  
    
  }
});

export default Profile;