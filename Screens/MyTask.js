import React from 'react';
import { View, StyleSheet,Text } from 'react-native';


function MyTask({navigation}) {
    return (
      <View style={styles.container}>
          <Text>Create Group</Text>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:"center"
  }
});

export default MyTask;