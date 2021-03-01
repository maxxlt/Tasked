import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  FlatList,
} from "react-native";
import Firebase, { db } from "../config/firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUser } from "../actions/User";

class Group extends React.Component {
  componentDidMount = () => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getUser(user.uid);
      }
    });
  };
  render() {
    const renderItem = ({ item }) => <Item title={item.title} />;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Firebase.auth().signOut();
            this.props.navigation.navigate("Landing");
          }}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => {
            db.collection("groups")
              .add({
                group_name: "Random",
                participants: [this.props.user.uid],
                tasks: [],
                group_id: "",
              })
              .then((docRef) => {
                db.collection("groups").doc(docRef.id).update({
                  group_id: docRef.id,
                });
              });
          }}
        >
          <Text style={styles.buttonText}>Add Group</Text>
        </TouchableOpacity> */}
        <Text>Hello World!</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

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
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Button style={styles.title} title={title}></Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUser }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
