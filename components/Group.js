import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import Firebase, { db } from "../config/firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUser } from "../actions/User";
import ActionButton from "react-native-action-button";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../assets/color";
import Appbar from "./Appbar";
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

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={styles.groupCard}>
    <View>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  </TouchableOpacity>

  // <GroupCard />
);

const Group = (props) => {
  const { navigation } = props;

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        style={{ backgroundColor, width: "45%" }}
      />
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
      <Appbar title="Groups" />
      <SafeAreaView style={styles.container}>
        <FlatList
          numColumns={2}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <ActionButton buttonColor={Colors.logoorange}>
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="New Group"
          onPress={() => console.log("notes tapped!")}
        >
          <Ionicons name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Update Group"
          onPress={() => {}}
        >
          <MaterialIcons name="upgrade" style={styles.actionButtonIcon} />
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
});

export default Group;
