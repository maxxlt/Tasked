import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { TextField, Button } from "react-native-ui-lib";
import colors from "../assets/color";
const tasks = [
  //Tasks hard-coded for creating UI. Will update fully next iteration
  {
    id: 1,
    title: "Complete Task View",
    completeBy: "today",
    completed: false,
  },
  {
    id: 2,
    title: "Complete Profile Page",
    completeBy: "tomorrow",
    completed: false,
  },
];

const Item = (item) => {
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};

const Comments = () => {
  const renderItem = ({ item }) => <Item item={item} />;
  return (
    <View>
      <View style={styles.list_container}>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.field_container}>
        <TextField
          style={styles.inputBox}
          onChangeText={() => console.log("text changing")}
          placeholder="Add comment here"
          hideUnderline
        />
        <Button
          label={"Add comment"}
          style={styles.button}
          onPress={() => console.log("Add comment pressed")}
          backgroundColor={colors.logoorange}
        />
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  list_container: {
    marginLeft: 20,
    marginVertical: 20,
  },
  field_container: {},
  inputBox: {
    fontSize: 16,
    marginHorizontal: 20,
  },
  button: {
    marginLeft: 20,
    height: 40,
    width: 145,
    borderColor: "#F6820D",
  },
});
