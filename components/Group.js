import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  SafeAreaView,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import Firebase, { db, auth } from "../config/firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUser } from "../actions/User";
import ActionButton from "react-native-action-button";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../assets/color";
import Appbar from "./Appbar";
import Modal from "react-native-modal";
import CreateGroup from "./CreateGroup";
import OptionsMenu from "react-native-options-menu";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29sdf2",
    title: "4th Item",
  },
];

const Item = ({ item }) => (
  <TouchableOpacity style={styles.groupCard}>
    <View>
      <View style={styles.top_card_container}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/group_tags/red_dot.png")}
        />

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
          // actions={[this.editPost, this.deletePost]}
        />
      </View>

      <Text style={styles.group_name}>{item.group_name}</Text>
      <Text style={styles.task_amount}>{item.group_id}</Text>
    </View>
  </TouchableOpacity>
);

const Group = (props) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [groups, setGroups] = useState([]); // Initial empty array of users
  const [selectedId, setSelectedId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const subscriber = db.collection("groups").onSnapshot((querySnapshot) => {
      const group = [];
      // Only query the groups that user is participated in
      querySnapshot.forEach((documentSnapshot) => {
        for (let j = 0; j < documentSnapshot.data().participants.length; j++) {
          if (auth.currentUser.uid == documentSnapshot.data().participants[j]) {
            group.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          }
        }
      });
      setGroups(group);
      setLoading(false);
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderGroups = ({ item }) => {
    return <Item item={item} />;
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
      <Appbar title="Groups" />
      <SafeAreaView style={styles.container}>
        <FlatList
          numColumns={2}
          data={groups}
          renderItem={renderGroups}
          keyExtractor={(item) => item.id}
        />
        <Modal
          isVisible={isModalVisible}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
        >
          <CreateGroup isModalVisible={toggleModal} />
        </Modal>
      </SafeAreaView>
      <ActionButton buttonColor={Colors.logoorange}>
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="New Group"
          onPress={toggleModal}
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
