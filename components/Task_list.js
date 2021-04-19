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
import Modal from "react-native-modal";
import Comments from "./Comments";
import EditTask from "./EditTask";
import FirestoreQueryInitials from "../backend/FirestoreQueryInitials";
import FirestoreNotifyUser from "../backend/FirestoreNotifyUser";

//delete function
const delete_task = (item) => {
  FirestoreDeleteTask(item.item);
};

const notify_user = (item) => {
  FirestoreNotifyUser(item.item);
};

const Item = (props) => {
  const [check, setCheck] = useState(props.item.is_complete);
  const [state, dispatch] = useContext(Context);

  const rightButtons = [
    <View
      style={{ height: 100, alignContent: "center", justifyContent: "center" }}
    >
      <TouchableOpacity
        style={{ marginLeft: 20 }}
        onPress={() => {
          props.setSelectedTask(props.item);
          props.toggleEditTaskModal();
        }}
      >
        <MaterialIcons name="edit" size={30}></MaterialIcons>
      </TouchableOpacity>
    </View>,
    <View
      style={{ height: 100, alignContent: "center", justifyContent: "center" }}
    >
      <TouchableOpacity
        style={{ marginLeft: 20 }}
        onPress={() => delete_task(props)}
      >
        <MaterialIcons name="delete" size={30}></MaterialIcons>
      </TouchableOpacity>
    </View>,
    <View
      style={{ height: 100, alignContent: "center", justifyContent: "center" }}
    >
      <TouchableOpacity
        style={{ marginLeft: 20 }}
        onPress={() => notify_user(props)}
      >
        <MaterialIcons name="notifications-active" size={30}></MaterialIcons>
      </TouchableOpacity>
    </View>,
  ];
  return (
    <Swipeable style={styles.swipable_container} rightButtons={rightButtons}>
      <View style={styles.item}>
        <View style={styles.checkbox}>
          <CheckBox
            left
            checkedColor="grey"
            checked={check}
            onPress={() => {
              setCheck(!props.item.is_complete);
              FirestoreUpdateTaskChecked(check, props);
            }}
          />
        </View>
        <View style={styles.task_container}>
          {!check && <Text style={styles.title}>{props.item.task_name}</Text>}
          {!check && (
            <Text style={styles.date}>
              {props.item.due_date} {props.item.due_time}
            </Text>
          )}
          {check && <Text style={styles.title1}>{props.item.task_name}</Text>}
          {check && (
            <Text style={styles.date1}>
              {props.item.due_date} {props.item.due_time}
            </Text>
          )}
          <Text  style={styles.assignedTo}>Assigned to:  {props.item.assigned_user.username} </Text>
          <Comments task={props.item} listKey={props.item.task_id} />
        </View>
      </View>
    </Swipeable>
  );
};

const Task_list = (props) => {
  const [isEditTaskModalVisible, setEditTaskModalVisible] = useState(
    //to check the state of the Edit Task popup
    false
  );
  const toggleEditTaskModal = () => {
    setEditTaskModalVisible(!isEditTaskModalVisible);
  };
  const renderItem = ({ item }) => (
    <Item
      item={item}
      toggleEditTaskModal={toggleEditTaskModal}
      setSelectedTask={setSelectedTask}
    />
  );
  const [selectedTask, setSelectedTask] = useState({});

  return (
    <View>
      <FlatList
        data={props.Data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal
        isVisible={isEditTaskModalVisible}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
      >
        <EditTask
          toggleEditTaskModal={toggleEditTaskModal}
          selectedTask={selectedTask}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  task_container: {
    alignItems: "flex-start",
    marginHorizontal: 20,
  },
  swipable_container: {},
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
    marginLeft: 20,
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
  assignedTo:{
    marginTop:5,
    fontSize: 15,
    marginLeft: 20,
    marginBottom: 5,
  },
});

export default Task_list;
