import React, { useState, useEffect, useContext } from "react";
import { LogBox } from "react-native";

import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-ui-lib";
import Colors from "../assets/color";
import FirestoreCreateGroup from "../backend/FirestoreCreateGroup.js";
import FirestoreQueryUser from "../backend/FirestoreQueryUser.js";

import { db, auth } from "../config/firebase";
LogBox.ignoreAllLogs();

const CreateGroup = (props) => {
  const [groupname, setGroupName] = useState("");
  const [queriedusers, setQueriedUsers] = useState([]);
  const [initials, setInitials] = useState("");
  const [participantsids, setParticipantsIds] = useState([]);
  const [participantId, setParticipantId] = useState([auth.currentUser.uid]);
  const fireinitial = () => {
    db.collection("users").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        try {
          if (auth.currentUser.uid == documentSnapshot.data().uid) {
            const fullName = documentSnapshot.data().fullname;
            const i = fullName.charAt(0) + fullName.charAt(1);
            setParticipantsIds([i.toUpperCase()]);
          }
        } catch (e) {
          console.log(e);
        }
      });
    });
  };
  useEffect(() => {
    //function that renders when component loads

    fireinitial();
  }, []);
  //Added participants item
  const renderIconItem = ({ item }) => {
    return (
      <View style={styles.icon_image}>
        <View style={styles.tinyLogo}>
          <Text style={{ color: Colors.white, fontWeight: "bold" }}>
            {item}
          </Text>
        </View>
      </View>
    );
  };

  //Queried in search item
  const ParticipantsIconItem = ({ username, onPress }) => (
    <TouchableOpacity style={styles.participants_container} onPress={onPress}>
      <View style={styles.tinyLogo}>
        <Text style={{ color: Colors.white, fontWeight: "bold" }}>
          {initials}
        </Text>
      </View>
      <Text style={styles.username_text}>{username}</Text>
    </TouchableOpacity>
  );

  const renderParticipantsItem = ({ item }) => {
    return (
      <ParticipantsIconItem
        username={item.username}
        onPress={() => {
          //pass in the onPress listener to the item
          setParticipantsIds((participantsids) => [
            ...participantsids,
            initials,
          ]);
          setParticipantId((participantId) => [...participantId, item.uid]);
        }}
      />
    );
  };
  return (
    //Set up create group screen with buttons and fields that the user can input details
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.x_btn_container}
        onPress={props.isModalVisible}
      >
        <Image style={styles.x_btn} source={require("../assets/x_btn.png")} />
      </TouchableOpacity>
      <View style={styles.title_container}>
        <Text style={styles.title_text}>CREATE GROUP</Text>
      </View>
      <Text style={styles.label}>Group name</Text>
      <KeyboardAvoidingView>
        <View style={styles.groupname_input_container}>
          <TextInput
            style={styles.inputBox}
            placeholder="Type group name"
            onChangeText={(text) => {
              setGroupName(text); //updating the state of the group name every single time user types in the text
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <Text style={styles.label}>Participants</Text>
      <View style={styles.icon_flatlist_container}>
        <FlatList
          data={participantsids}
          renderItem={renderIconItem}
          keyExtractor={(item, index) => String(index)}
          horizontal
        ></FlatList>
      </View>
      <KeyboardAvoidingView>
        <View style={styles.username_input_container}>
          <TextInput
            style={styles.inputBox}
            placeholder="Type username"
            onChangeText={(text) => {
              FirestoreQueryUser(text, setQueriedUsers, setInitials); //query user from firestore if exists
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
      <Button
        label={"Create Group"}
        style={styles.button}
        backgroundColor={Colors.logoorange}
        disabled={!groupname.length} //disable button if user didn't type anything in groupname
        onPress={() => {
          FirestoreCreateGroup(groupname, participantId); //populate db onPress
          props.isModalVisible(); //hide the popup
        }}
        enableShadow
        center
      />
    </View>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
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
    borderColor: Colors.grey,
    borderRadius: 5,
  },
  groupname_input_container: {
    marginTop: 12,
    height: 52,
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: Colors.white,
  },
  username_input_container: {
    marginTop: 12,
    height: 52,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 20,
    backgroundColor: Colors.white,
  },
  button: {
    alignItems: "center",
    borderColor: Colors.pumpkinOrange,
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
    backgroundColor: Colors.white,
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
    borderRadius: 16,
    backgroundColor: Colors.orange,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
