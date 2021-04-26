import React, { useState, useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
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
import Colors from "../assets/color";

//delete function
const delete_task = (item) => {
  FirestoreDeleteTask(item.item);
};

const notify_user = (item) => {
  FirestoreNotifyUser(item.item);
};

const Item = (props) => {
  const [onComplete, setOnComplete] = useState(props.item.is_complete);
  const [state, dispatch] = useContext(Context);
  const [onCardPress, setOnCardPress] = useState(false);

  const togggleCard = () => {
    setOnCardPress(!onCardPress);
  };

  const toggleOnComplete = () => {
    setOnComplete(!onComplete);
    FirestoreUpdateTaskChecked(onComplete, props);
  };

  const leftContent = (
    <View style={[styles.leftSwipeItem]}>
      <MaterialIcons
        name="check"
        size={30}
        color={Colors.success}
      ></MaterialIcons>
    </View>
  );

  const rightButtons = [
    <View style={styles.rightSwipeItem}>
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
    <View style={styles.rightSwipeItem}>
      <TouchableOpacity
        style={{ marginLeft: 20 }}
        onPress={() => {
          delete_task(props);
          props.onRefresh();
        }}
      >
        <MaterialIcons name="delete" size={30}></MaterialIcons>
      </TouchableOpacity>
    </View>,
    <View style={styles.rightSwipeItem}>
      <TouchableOpacity
        style={{ marginLeft: 20 }}
        onPress={() => notify_user(props)}
      >
        <MaterialIcons name="notifications-active" size={30}></MaterialIcons>
      </TouchableOpacity>
    </View>,
  ];
  return (
    <Swipeable
      style={styles.swipable_container}
      leftContent={leftContent}
      rightButtons={rightButtons}
      onLeftActionComplete={() => {
        toggleOnComplete();
      }}
    >
      <Card onPress={togggleCard} style={styles.card}>
        <Card.Title
          title={props.item.task_name}
          subtitle={
            "Due date: " + props.item.due_date + " " + props.item.due_time
          }
          titleStyle={
            onComplete ? styles.card_title_complete : styles.card_title
          }
          subtitleStyle={
            onComplete ? styles.card_title_complete : styles.card_title
          }
        />
        <Text
          style={onComplete ? styles.assign_text_complete : styles.assign_text}
        >
          {props.item.assigned_user.username == undefined
            ? "Assigned to: no one "
            : "Assigned to: " + props.item.assigned_user.username}
        </Text>
        <Card.Content>
          {onCardPress && (
            <Comments task={props.item} listKey={props.item.task_id} />
          )}
        </Card.Content>
      </Card>
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
      onRefresh={props.onRefresh}
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
  leftSwipeItem: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20,
    marginVertical: 8,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
    marginVertical: 8,
  },
  card: {
    minHeight: 148,
    marginVertical: 8,
  },
  card_title: {
    marginLeft: 16,
  },
  card_title_complete: {
    marginLeft: 16,
    textDecorationLine: "line-through",
  },
  assign_text: {
    marginLeft: 32,
  },
  assign_text_complete: {
    marginLeft: 32,
    textDecorationLine: "line-through",
  },
  swipable_container: {
    paddingHorizontal: 12,
  },
});

export default Task_list;
