import React from "react";
import { TextInput, StyleSheet, FlatList } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  updateFullname,
  updateUsername,
  signup,
} from "../actions/User";
import {
  View,
  TextField,
  TouchableOpacity,
  Button,
  Text,
  Shadows,
} from "react-native-ui-lib";
import colors from "../assets/color";

class Signup extends React.Component {
  handleSignUp = () => {
    this.props.signup();
    this.props.navigation.navigate("Group");
  };

  render() {
    return (
      <View>
        <TextField
          style={styles.inputBox}
          value={this.props.user.email}
          onChangeText={(email) => this.props.updateEmail(email)}
          placeholder="Email"
          autoCapitalize="none"
          hideUnderline
          enableErrors
        />
        <TextField
          style={styles.inputBox}
          value={this.props.user.password}
          onChangeText={(password) => this.props.updatePassword(password)}
          placeholder="Password"
          secureTextEntry={true}
          hideUnderline
        />
        <TextField
          style={styles.inputBox}
          value={this.props.user.username}
          onChangeText={(username) => this.props.updateUsername(username)}
          placeholder="Username"
          autoCapitalize="none"
          hideUnderline
        />
        <TextField
          style={styles.inputBox}
          value={this.props.user.fullname}
          onChangeText={(fullname) => this.props.updateFullname(fullname)}
          placeholder="Full Name"
          hideUnderline
        />
        <Button
          label={"Sign Up"}
          style={styles.button}
          onPress={this.handleSignUp}
          backgroundColor={colors.logoorange}
          enableShadow
          center
        />
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
  inputBox: {
    width: "90%",
    paddingVertical: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    textAlign: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 120,
    alignItems: "center",
    borderColor: "#F6820D",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonSignup: {
    fontSize: 12,
  },
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { updateEmail, updatePassword, updateUsername, updateFullname, signup },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
