import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const CreateGroup = (props) => {
  return (
    <View>
      <Text>Hello from CreateGroup</Text>
      <Button title="Create Group" onPress={props.isModalVisible} />
    </View>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({});
