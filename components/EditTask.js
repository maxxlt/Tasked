import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Button } from "react-native-ui-lib";
import colors from "../assets/color";
import FirestoreQueryUser from "../backend/FirestoreQueryUser.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Context } from "../reducers/Store";
import FirestoreEditTask from "../backend/FirestoreEditTask";



import { db, auth } from "../config/firebase";
const EditTask = (props) => {
  const [taskname, setTaskName] = useState(props.selectedTask.task_name);
  const [queriedusers, setQueriedUsers] = useState([
    props.selectedTask.assigned_user,
  ]);
  const [initials, setInitials] = useState()
  const [assigneduser, setAssignedUser] = useState(
    props.selectedTask.assigned_user.username
  );
  const [state, dispatch] = useContext(Context);

  //Time and date picker hooks
  const [date, setDate] = useState(
    new Date(props.selectedTask.due_date + " " + props.selectedTask.due_time)
  );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  //Time and date picker functions
  const onPickerChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };
  const showTimepicker = () => {
    showMode("time");
  };
  const renderParticipantsItem = ({ item }) => {
    return (
      <ParticipantsIconItem
        username={item.username}
        onPress={() => {
          setAssignedUser(item.username);
        }}
      />
    );
  };
  //Added participants item
const IconItem = ({ assigneduser }) => (
  <View style={styles.participants_container}>
    <View
      style={styles.tinyLogo}
      source={require("../assets/default_profile_pic.png")}
    >
        <Text style={{color:"white", fontWeight:"bold"}} >{initials}</Text>
     
      </View>
    <Text style={styles.username_text}>{assigneduser}</Text>
  </View>
);
//Queried in search item
const ParticipantsIconItem = ({ username, onPress }) => (
  <TouchableOpacity style={styles.participants_container} onPress={onPress}>
     <View
      style={styles.tinyLogo}
      source={require("../assets/default_profile_pic.png")}>
        <Text style={{color:"white", fontWeight:"bold"}} >{initials}</Text>
     
      </View>
    <Text style={styles.username_text}>{username}</Text>
  </TouchableOpacity>
);
const fireinitial = () => {
  db.collection("users").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((documentSnapshot) => {
      try {
        if ( props.selectedTask.assigned_user.uid == documentSnapshot.data().uid)
        {
            const fullName  = documentSnapshot.data().fullname
            const i = fullName.charAt(0) + fullName.charAt(1)          
            setInitials([i.toUpperCase()])
        }
      } catch (e) {
        console.log(e);
      }
    });
  });
  
}

useEffect (()=>{
  fireinitial()
},[])
  return (
    //Set up create group screen with buttons and fields that the user can input details
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.x_btn_container}
        onPress={props.toggleEditTaskModal}
      >
        <Image style={styles.x_btn} source={require("../assets/x_btn.png")} />
      </TouchableOpacity>
      <View style={styles.title_container}>
        <Text style={styles.title_text}>EDIT TASK</Text>
      </View>
      <Text style={styles.label}>Task name</Text>
      <KeyboardAvoidingView>
        <View style={styles.taskname_input_container}>
          <TextInput
            style={styles.inputBox}
            value={taskname}
            placeholder="Type task name"
            onChangeText={(text) => {
              setTaskName(text); //updating the state of the group name every single time user types in the text
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <Text style={styles.label}>Assign to</Text>
      {assigneduser != "" && (
        <View style={styles.participants_flatlist_container}>
          <IconItem assigneduser={assigneduser} style={{ width: "45%" }} />
        </View>
      )}

      <KeyboardAvoidingView>
        <View style={styles.username_input_container}>
          <TextInput
            style={styles.inputBox}
            placeholder="Type username"
            onChangeText={(text) => {
              FirestoreQueryUser(text, setQueriedUsers, setInitials); //query user from firestore if exists
              console.log(initials)
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.username_flatlist_container}>
        <FlatList
          data={queriedusers}
          renderItem={renderParticipantsItem}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </View>
      <Text style={styles.label}>Due date</Text>
      <View style={styles.due_date_container}>
        <TouchableOpacity
          onPress={showDatepicker}
          style={styles.pick_date_container}
        >
          <Text style={styles.pick_date_text}>Pick date</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showTimepicker}>
          <Text style={styles.pick_time_text}>Pick time</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="spinner"
            onChange={onPickerChange}
          />
        )}
      </View>
      <View style={styles.due_date_container}>
        <Text style={styles.date_text}>{date.toDateString()}</Text>
        <Text style={styles.time_text}>{date.toTimeString()}</Text>
      </View>
      <Button
        label={"Edit Task"}
        style={styles.button}
        backgroundColor={colors.logoorange}
        disabled={!taskname.length} //disable button if user didn't type anything in taskname
        onPress={() => {
          FirestoreEditTask(
            props.selectedTask.task_id,
            taskname,
            queriedusers[0],
            date
          ); //populate db onPress
          props.toggleEditTaskModal(); //hide the popup
        }}
        enableShadow
        center
      />
    </View>
  );
};

export default EditTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    width: "100%",
    marginBottom: 50,
    borderRadius: 5,
  },
  title_container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  title_text: {
    fontSize: 24,
  },
  label: {
    fontSize: 16,
    marginLeft: 20,
    marginTop: 15,
  },
  inputBox: {
    marginHorizontal: 18,
    paddingVertical: 15,
    fontSize: 16,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  taskname_input_container: {
    marginTop: 12,
    height: 52,
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  username_input_container: {
    marginTop: 12,
    height: 52,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  button: {
    alignItems: "center",
    borderColor: "#F6820D",
    borderRadius: 5,
    marginTop: 26,
    marginHorizontal: 33,
  },
  icon_flatlist_container: {
    height: 60,
  },
  icon_image: {
    paddingVertical: 15,
    height: 32,
    width: 32,
    marginLeft: 20,
  },
  username_flatlist_container: {
    // height: 0,
    maxHeight: 150,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  username_text: {
    marginLeft: 12,
    paddingVertical: 5,
  },
  participants_container: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 12,
  },
  x_btn_container: {
    height: 21,
    width: 21,
    alignSelf: "flex-end",
    marginTop: 21,
    marginRight: 21,
  },
  x_btn: {},
  tinyLogo: {
    height: 32,
    width: 32,
    borderRadius:16,
    backgroundColor:"#FCCF3E",
    alignContent:"center",
    justifyContent:"center",
    alignItems:"center"
  },
  participants_flatlist_container: {
    marginTop: 12,
    paddingVertical: 12,
    maxHeight: 150,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginHorizontal: 20,
  },
  due_date_container: {
    flexDirection: "row",
    marginHorizontal: 70,
    marginTop: 15,
  },
  pick_date_container: {
    marginRight: 88,
  },
  pick_date_text: { color: colors.logoorange },
  pick_time_text: { color: colors.logoorange },
  date_text: { marginRight: 38 },
  time_text: {},
});
