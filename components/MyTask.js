import React, {useState, useEffect}  from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Task_list from "./Task_list.js";
import Appbar from "./Appbar";
import { auth } from "../config/firebase";

import FirestoreQueryMyTasks from "../backend/FirestoreQuerryMyTasks";


const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); 
  //Rerenders the component every single time when database for groups is changed
  
  useEffect(() =>
  {
    setLoading(true);
    const subscriber = FirestoreQueryMyTasks(setTasks, auth.currentUser.uid , setLoading);
    // Unsubscribe from events when no longer in use
    
    return () => subscriber();
  }, []);

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
