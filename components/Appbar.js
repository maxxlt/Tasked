import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Appbar = (props) => { //function for the top yellow UI design passings props in function and returning views
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};

export default Appbar;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#FCCF3E",
    height: 108,
  },
  image: { height: 40, width: 40, borderRadius: 5 },
  text: {
    marginTop: 65,
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
