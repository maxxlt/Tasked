import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "../assets/color";

const Appbar = (props) => {
  //function for the top yellow UI design passings props in function and returning views
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
    backgroundColor: Colors.orange,
    height: 108,
  },
  image: { height: 40, width: 40, borderRadius: 5 },
  text: {
    marginTop: 65,
    color: Colors.black,
    fontSize: 20,
    fontWeight: "bold",
  },
});
