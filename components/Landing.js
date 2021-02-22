import React from "react";
import { StyleSheet, Image } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateEmail, updatePassword, login, getUser } from "../actions/User";
import Firebase from "../config/firebase";
import colors from "../assets/color";
import SignUp from "./SignUp";
import Login from "./Login";
import {
  View,
  TabBar,
  Text,
  Typography,
  ThemeManager,
} from "react-native-ui-lib";
class Landing extends React.Component {
  state = { tab: 0 };

  render() {
    const { tab } = this.state;
    Typography.loadTypographies({
      welcomeText: { fontSize: 32, paddingBottom: 10, fontWeight: "100" },
    });
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/img/android/logo-black-text.png")}
        />
        <Text welcomeText style={styles.welcomeText}>
          WELCOME
        </Text>
        <TabBar
          style={styles.tabbar}
          enableShadow={false}
          indicatorStyle={{ backgroundColor: colors.orange }}
        >
          <TabBar.Item
            label="Login"
            onPress={() => {
              this.setState({
                tab: 0,
              });
            }}
          />
          <TabBar.Item
            label="Sign Up"
            onPress={() => {
              this.setState({
                tab: 1,
              });
            }}
          />
        </TabBar>
        {this.state.tab === 0 ? (
          <Login navigation={this.props.navigation} />
        ) : (
          <SignUp navigation={this.props.navigation} />
        )}
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
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
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
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonSignup: {
    fontSize: 12,
  },
  logo: {
    width: 150,
    height: 150,
  },
  tabbar: {
    marginVertical: 10,
  },
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { updateEmail, updatePassword, login, getUser },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
