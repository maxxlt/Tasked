import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { db, auth } from "../config/firebase";
import ActionButton from "react-native-action-button";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../assets/color";
import Appbar from "./Appbar";
import Modal from "react-native-modal";
import CreateGroup from "./CreateGroup";
import EditGroup from "./EditGroup";
import OptionsMenu from "react-native-options-menu";
import FirestoreDeleteGroup from "../backend/FirestoreDeleteGroup";

const Group = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [groups, setGroups] = useState([]); // list of queried groups where user participated in
  const [selectedGroupId, setSelectedGroupId] = useState(""); //a selected group id to pass in Edit Group
  const [selectedGroupName, setSelectedGroupName] = useState(""); //a selected group name to pass in Edit Group
  const [isCreateGroupModalVisible, setCreateGroupModalVisible] = useState(
    //to check the state of the Create Group popup
    false
  );
  const [isEditGroupModalVisible, setEditGroupModalVisible] = useState(false); //to check the state of the Edit Group popup
  const [participants, setParticipants] = useState([]); //array of participants to pass in Edit Group

  //individual group task page
  const groupPage = () => {
    navigation.navigate("GroupPage");
  };

  //Group Card
  const Item = ({
    item, //passing in the group object
    //pass in functions below
    toggleEditGroupModal,
    setSelectedGroupId,
    setSelectedGroupName,
    setParticipants,
  }) => (
    <TouchableOpacity onPress={groupPage} style={styles.groupCard}>
      <View>
        <View style={styles.top_card_container}>
          <Image
            style={styles.tinyLogo}
            source={require("../assets/group_tags/red_dot.png")}
          />

          {/* 3 dots options */}
          <OptionsMenu
            customButton={
              <View style={styles.three_dots_container}>
                <Image
                  style={styles.three_dots}
                  source={require("../assets/three_dots.png")}
                />
              </View>
            }
            buttonStyle={{
              width: 32,
              height: 8,
              margin: 7.5,
              resizeMode: "contain",
            }}
            destructiveIndex={1}
            options={["Edit", "Delete"]}
            actions={[
              () => {
                //action for Edit Group
                setSelectedGroupId(item.group_id);
                setSelectedGroupName(item.group_name);
                setParticipants(item.participants);
                toggleEditGroupModal();
              },
              () => {
                //action for Delete Group
                FirestoreDeleteGroup(item.group_id);
              },
            ]}
          />
        </View>

        <Text style={styles.group_name}>{item.group_name}</Text>
        <Text style={styles.task_amount}>{item.group_id}</Text>
      </View>
    </TouchableOpacity>
  );

  //Rerenders the component every single time when database for groups is changed
  useEffect(() => {
    setLoading(true);
    const subscriber = db.collection("groups").onSnapshot((querySnapshot) => {
      const group = [];
      // Only query the groups that user is participated in
      querySnapshot.forEach((documentSnapshot) => {
        try {
          for (
            let j = 0;
            j < documentSnapshot.data().participants.length;
            j++
          ) {
            if (
              auth.currentUser.uid == documentSnapshot.data().participants[j]
            ) {
              group.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
      setGroups(group);
      setLoading(false);
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  //sets a loader while populating groups
  if (loading) {
    return <ActivityIndicator />;
  }
  const toggleCreateGroupModal = () => {
    setCreateGroupModalVisible(!isCreateGroupModalVisible);
  };
  const toggleEditGroupModal = () => {
    setEditGroupModalVisible(!isEditGroupModalVisible);
  };

  const renderGroups = ({ item }) => {
    return (
      <Item
        item={item}
        toggleEditGroupModal={toggleEditGroupModal}
        setSelectedGroupId={setSelectedGroupId}
        setSelectedGroupName={setSelectedGroupName}
        setParticipants={setParticipants}
      />
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
      <Appbar title="Groups" />
      <ScrollView style={styles.container}>
        <FlatList
          numColumns={2}
          data={groups}
          renderItem={renderGroups}
          keyExtractor={(item, index) => String(index)}
        />
        <Modal
          isVisible={isCreateGroupModalVisible}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
        >
          <CreateGroup isModalVisible={toggleCreateGroupModal} />
        </Modal>
        <Modal
          isVisible={isEditGroupModalVisible}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
        >
          <EditGroup
            isModalVisible={toggleEditGroupModal}
            selectedGroupId={selectedGroupId}
            selectedGroupName={selectedGroupName}
            participants={participants}
          />
        </Modal>
      </ScrollView>
      <ActionButton buttonColor={Colors.logoorange}>
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="New Group"
          onPress={toggleCreateGroupModal}
        >
          <Ionicons name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

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
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#F6820D",
    borderColor: "#F6820D",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  groupCard: {
    height: 180,
    width: 165,
    margin: 16,
    borderRadius: 5,
    color: "#FFFFFF",
    height: 150,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 10,
  },
  tinyLogo: {
    width: 26,
    height: 26,
    marginLeft: 12,
    marginTop: 12,
  },
  group_name: {
    marginLeft: 12,
    marginTop: 42,
    fontSize: 16,
  },
  task_amount: {
    marginTop: 8,
    marginLeft: 12,
    fontSize: 12,
    color: "#8B8B8B",
  },
  top_card_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  three_dots_container: {
    alignSelf: "flex-end",
    marginRight: 12,
    marginTop: 12,
  },
  three_dots: {
    height: 26,
    resizeMode: "contain",
  },
});

export default Group;
