import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import Firebase, { db } from "../config/firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getUser } from "../actions/User";
import ActionButton from "react-native-action-button";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../assets/color";

class Group extends React.Component {
  componentDidMount = () => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getUser(user.uid);
      }
    });
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
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
          <TouchableOpacity
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
          </TouchableOpacity>
          <Text></Text>
        </View>
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
