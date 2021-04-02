import React, { useState, useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Swipeable from "react-native-swipeable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FirestoreDeleteTask from "../backend/FirestoreDeleteTask";
import FirestoreUpdateTaskChecked from "../backend/FirestoreUpdateTaskChecked";
import { Context } from "../reducers/Store";

//edit function
const edit_task = (item) => {
  console.log("edit pressed");
};

//delete function
const delete_task = (item) => {
  FirestoreDeleteTask(item.item);
};

const Item = (item) => {
  const [check, setCheck] = useState(false);
  const [state, dispatch] = useContext(Context);
  const rightButtons = [
    <View
      style={{ height: 100, alignContent: "center", justifyContent: "center" }}
    >
      <TouchableOpacity
        style={{ marginLeft: 20 }}
        onPress={() => edit_task(item)}
      >
        <MaterialIcons name="edit" size={30}></MaterialIcons>
      </TouchableOpacity>
    </View>,
    <View
      style={{ height: 100, alignContent: "center", justifyContent: "center" }}
    >
      <TouchableOpacity
        style={{ marginLeft: 20 }}
        onPress={() => delete_task(item, state)}
      >
        <MaterialIcons name="delete" size={30}></MaterialIcons>
      </TouchableOpacity>
    </View>,
  ];
  return (
    <Swipeable rightButtons={rightButtons}>
      <View style={styles.item}>
        <View style={styles.checkbox}>
          <CheckBox
            left
            checkedColor="grey"
            checked={check}
            onPress={() => {
              setCheck(!check);
              FirestoreUpdateTaskChecked(check, item);
            }}
          />
        </View>
        <View>
          {!check && <Text style={styles.title}>{item.item.task_name}</Text>}
          {!check && (
            <Text style={styles.date}>
              {item.item.due_date} {item.item.due_time}
            </Text>
          )}
          {check && <Text style={styles.title1}>{item.item.task_name}</Text>}
          {check && (
            <Text style={styles.date1}>
              {item.item.due_date} {item.item.due_time}
            </Text>
          )}
        </View>
      </View>
    </Swipeable>
  );
};

const Task_list = (props) => {
  const renderItem = ({ item }) => <Item item={item} />;
  return (
    <FlatList
      data={props.Data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  checkbox: {
    height: 30,
    width: 20,
    marginRight: 25,
    marginTop: 10,
  },
  item: {
    backgroundColor: "white",
    shadowColor: "grey",
    elevation: 2,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    marginLeft: 20,

    marginBottom: 5,
  },

  date: {
    marginLeft: 25,
    color: "grey",
  },
  title1: {
    fontSize: 20,
    marginLeft: 20,
    textDecorationLine: "line-through",
    marginBottom: 5,
  },
  date1: {
    marginLeft: 25,
    textDecorationLine: "line-through",
    color: "grey",
  },
});

export default Task_list;
