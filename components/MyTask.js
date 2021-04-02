import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Task_list from "./Task_list.js";
import Appbar from "./Appbar";

const tasks = [
  //Tasks hard-coded for creating UI. Will update fully next iteration
  {
    id: 1,
    title: "Complete Task View",
    completeBy: "today",
    completed: false,
    comments: [],
  },
  {
    id: 2,
    title: "Complete Profile Page",
    completeBy: "tomorrow",
    completed: false,
    comments: [],
  },
];

const MyTask = () => {
  return (
    <View style={styles.container}>
      <Appbar title="Tasks" />
      <ScrollView>
        <Task_list Data={tasks} />
      </ScrollView>
    </View>
  );
};

export default MyTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
