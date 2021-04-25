import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import Task_list from "./Task_list.js";
import Appbar from "./Appbar";
import { auth } from "../config/firebase";
import FirestoreUpdatePushToken from "../backend/FirestoreUpdatePushToken";
import FirestoreQueryMyTasks from "../backend/FirestoreQuerryMyTasks";
import registerForPushNotificationsAsync from "../backend/Notification";
import Colors from "../assets/color";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  //Rerenders the component every single time when database for groups is changed
  if (auth.currentUser) {
    registerForPushNotificationsAsync().then((token) =>
      FirestoreUpdatePushToken(token)
    );
  }
  useEffect(() => {
    setLoading(true);
    let subscriber = () => {
      console.log("no user detected");
    };
    if (auth.currentUser) {
      subscriber = FirestoreQueryMyTasks(
        setTasks,
        auth.currentUser.uid,
        setLoading
      );
    }
    // Unsubscribe from events when no longer in use

    return () => subscriber();
  }, []);
  if (loading) {
    return <ActivityIndicator />;
  }

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
    color: Colors.white,
  },
});
