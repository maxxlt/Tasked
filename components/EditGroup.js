import React, { useState, useEffect } from "react";
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
import colors from "../assets/color";
import { Button } from "react-native-ui-lib";
import FirestoreQueryUser from "../backend/FirestoreQueryUser.js";

const ExistingParticipantsItem = ({ username }) => (
  <View style={styles.participants_container}>
    <Image
      style={styles.tinyLogo}
      source={require("../assets/default_profile_pic.png")}
    />
    <Text style={styles.username_text}>{username}</Text>
  </View>
);

const ParticipantsIconItem = ({ username, onPress }) => (
  <TouchableOpacity style={styles.participants_container} onPress={onPress}>
    <Image
      style={styles.tinyLogo}
      source={require("../assets/default_profile_pic.png")}
    />
    <Text style={styles.username_text}>{username}</Text>
  </TouchableOpacity>
);

const EditGroup = (props) => {
  const [queriedusers, setQueriedUsers] = useState([]);
  const [participantsids, setParticipantsIds] = useState(props.participants);
  const renderParticipantsItem = ({ item }) => {
    return (
      <ParticipantsIconItem
        username={item.username}
        onPress={() => {
          setParticipantsIds((participantsids) => [
            ...participantsids,
            item.id,
          ]);
        }}
      />
    );
  };
  const renderExistingParticipantsItem = ({ item }) => {
    return (
      <ExistingParticipantsItem
        username={item.username}
        onPress={() => {
          setParticipantsIds((participantsids) => [
            ...participantsids,
            item.id,
          ]);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.x_btn_container}
        onPress={props.isModalVisible}
      >
        <Image style={styles.x_btn} source={require("../assets/x_btn.png")} />
      </TouchableOpacity>
      <View style={styles.title_container}>
        <Text style={styles.title_text}>EDIT GROUP</Text>
      </View>
      <Text style={styles.label}>Group name</Text>
      <KeyboardAvoidingView>
        <View style={styles.groupname_input_container}>
          <TextInput
            style={styles.inputBox}
            placeholder="Type group name"
            value={props.selectedGroupName}
            onChangeText={(text) => {
              setGroupName(text);
            }}
          />
        </View>
        <Text style={styles.label}>Participants</Text>
        <View style={styles.participants_flatlist_container}>
          <FlatList
            data={participantsids}
            renderItem={renderExistingParticipantsItem}
            keyExtractor={(item, index) => String(index)}
          ></FlatList>
        </View>
        <View style={styles.username_input_container}>
          <TextInput
            style={styles.inputBox}
            placeholder="Type username"
            onChangeText={(text) => {
              FirestoreQueryUser(text, setQueriedUsers);
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
        label={"Edit Group"}
        style={styles.button}
        backgroundColor={colors.logoorange}
        onPress={() => {
          props.isModalVisible();
        }}
        enableShadow
        center
      />
    </View>
  );
};

export default EditGroup;

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
  groupname_input_container: {
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
  participants_flatlist_container: {
    marginTop: 12,
    paddingVertical: 12,
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
  },
});
