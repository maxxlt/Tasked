import Appbar from "./Appbar";
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import ActionButton from "react-native-action-button";
import Colors from "../assets/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import Task_list from "./Task_list";
import CreateTask from "./CreateTask";
import Modal from "react-native-modal";
import { Context } from "../reducers/Store";

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

export default function GroupTask() {
  const [isCreateTaskModalVisible, setCreateTaskModalVisible] = useState(
    //to check the state of the Create Group popup
    false
  );
  const [state, dispatch] = useContext(Context);
  const toggleCreateTaskModal = () => {
    setCreateTaskModalVisible(!isCreateTaskModalVisible);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
      <Appbar title="LOL" />
      <ScrollView style={styles.container}>
        <Task_list Data={tasks} />
        <Modal
          isVisible={isCreateTaskModalVisible}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
        >
          <CreateTask isModalVisible={toggleCreateTaskModal} />
        </Modal>
      </ScrollView>
      <ActionButton buttonColor={Colors.logoorange}>
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="New Task"
          onPress={toggleCreateTaskModal}
        >
          <Ionicons name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
