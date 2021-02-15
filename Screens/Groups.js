import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function Groups({navigation}) {
    return (
      <View style={styles.container}>
          <Text>Welcome</Text>
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