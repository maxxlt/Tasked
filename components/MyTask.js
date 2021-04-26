import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import Task_list from "./Task_list.js";
import Appbar from "./Appbar";
import { auth } from "../config/firebase";
import FirestoreUpdatePushToken from "../backend/FirestoreUpdatePushToken";
import FirestoreQueryMyTasks from "../backend/FirestoreQuerryMyTasks";
import registerForPushNotificationsAsync from "../backend/Notification";
import Colors from "../assets/color";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  //Rerenders the component every single time when database for groups is changed
  if (auth.currentUser) {
    registerForPushNotificationsAsync().then((token) =>
      FirestoreUpdatePushToken(token)
    );
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
  }, [refreshing]);
  if (loading) {
    return <ActivityIndicator />;
  }
  if (tasks.length == 0) {
    return (
      <View style={styles.container}>
        <Appbar title="Tasks" />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            flex: 1,
          }}
        >
          <Text style={{ color: "grey", size: 20 }}>No Tasks Assigned</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Appbar title="Tasks" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
