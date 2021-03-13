import React from "react";
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
import colors from "../assets/color";
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
const IconItem = ({ item, onPress, style }) => (
  <View style={styles.icon_image}>
    <Image
      style={styles.tinyLogo}
      source={require("../assets/participant_test.png")}
    />
  </View>
);
const ParticipantsIconItem = ({ item, onPress, style }) => (
  <View style={styles.participants_container}>
    <Image
      style={styles.tinyLogo}
      source={require("../assets/participant_test.png")}
    />
    <Text style={styles.username_text}>Group name</Text>
  </View>
);

const CreateGroup = (props) => {
  const renderIconItem = ({ item }) => {
    return <IconItem item={item} style={{ width: "45%" }} />;
  };
  const renderParticipantsItem = ({ item }) => {
    return <ParticipantsIconItem item={item} style={{ width: "45%" }} />;
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
        <Text style={styles.title_text}>CREATE GROUP</Text>
      </View>
      <Text style={styles.label}>Group name</Text>
      <KeyboardAvoidingView>
        <View style={styles.groupname_input_container}>
          <TextInput style={styles.inputBox} placeholder="Type group name" />
        </View>
      </KeyboardAvoidingView>
      <Text style={styles.label}>Participants</Text>
      <View style={styles.icon_flatlist_container}>
        <FlatList
          data={DATA}
          renderItem={renderIconItem}
          keyExtractor={(item) => item.id}
          horizontal
        ></FlatList>
      </View>
      <KeyboardAvoidingView>
        <View style={styles.username_input_container}>
          <TextInput style={styles.inputBox} placeholder="Type username" />
        </View>
      </KeyboardAvoidingView>
      <View style={styles.username_flatlist_container}>
        <FlatList
          data={DATA}
          renderItem={renderParticipantsItem}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </View>
      <Button
        label={"Create Group"}
        style={styles.button}
        backgroundColor={colors.logoorange}
        onPress={props.isModalVisible}
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
});
