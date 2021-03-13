import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Image,
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
const Item = ({ item, onPress, style }) => (
  <View style={styles.icon_image}>
    <Image
      style={styles.tinyLogo}
      source={require("../assets/group_tags/red_dot.png")}
    />
  </View>
);

const CreateGroup = (props) => {
  const renderItem = ({ item }) => {
    return <Item item={item} style={{ width: "45%" }} />;
  };
  return (
    <View style={styles.container}>
      <View style={styles.title_container}>
        <Text style={styles.title_text}>CREATE GROUP</Text>
      </View>
      <Text style={styles.label}>Group name</Text>
      <KeyboardAvoidingView>
        <View style={styles.inputBox_container}>
          <TextInput style={styles.inputBox} placeholder="Type group name" />
        </View>
      </KeyboardAvoidingView>
      <Text style={styles.label}>Participants</Text>
      <View style={styles.flatlist_container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
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
  inputBox_container: {
    marginTop: 12,
    height: 52,
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  button: {
    alignItems: "center",
    borderColor: "#F6820D",
    borderRadius: 5,
  },
  flatlist_container: {
    height: 60,
    borderWidth: 1,
  },
  icon_image: {
    paddingVertical: 15,
  },
});
