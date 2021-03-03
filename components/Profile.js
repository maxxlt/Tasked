import React from "react";
import Appbar from './Appbar';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
const Profile = () => {
  return (
    <View>
       <Appbar title="Profile"/>
      <Text>HELLO FROM DUMMY</Text>
    </View>
  );
};

export default Profile;
