import Appbar from "./Appbar";
import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import ActionButton from "react-native-action-button";
import Colors from "../assets/color";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function GroupTask() {
  const [isCreateTaskModalVisible, setCreateTaskModalVisible] = useState(
    //to check the state of the Create Group popup
    false
  );
  const toggleCreateTaskModal = () => {
    setCreateTaskModalVisible(!isCreateTaskModalVisible);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
      <Appbar title="LOL" />
      <ScrollView style={styles.container}></ScrollView>
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
