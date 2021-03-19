import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../assets/color";
import { Button } from "react-native-ui-lib";

const EditGroup = (props) => {
  return (
    <View style={styles.container}>
      <Text>Hello From EditGroup</Text>
      <Button
        label={"Edit Group"}
        style={styles.button}
        backgroundColor={colors.logoorange}
        onPress={() => {
          props.isModalVisible();
        }}
        enableShadow
        center
      />
    </View>
  );
};

export default EditGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    width: "100%",
    marginBottom: 50,
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
    borderColor: "#F6820D",
    borderRadius: 5,
    marginTop: 26,
    marginHorizontal: 33,
  },
});
