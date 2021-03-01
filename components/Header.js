import * as React from "react";
import { Component } from "react";
import { View, Text, StatusBar, Image, StyleSheet } from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  AntDesign,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../assets/color";

const styles = StyleSheet.create({
  logo: {
    width: 66,
    height: 58,
  },
});

class HeaderClass extends Component {
  render() {
    return (
      <View
        style={{
          //setting background color to orange
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor={colors.orange} />
        <View style={{ backgroundColor: colors.orange }}>
          <View
            style={{
              padding: 3,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: colors.white, fontSize: 15 }}>{"9:41"}</Text>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Ionicons name="cellular" size={20} color="white" />

              <AntDesign
                name="wifi"
                size={20}
                color="white"
                style={{ margin: 1 }}
              />

              <FontAwesome
                name="battery"
                size={20}
                color="white"
                style={{ margin: 3 }}
              />
            </View>
          </View>
          <View style={{ alignItems: "center", padding: 20 }}>
            <Image
              style={styles.logo}
              source={require("C:/Users/samue_000/Desktop/Courses/CSE3311/Tasked/assets/img/android/logo-black-text.png")}
            />
            <Text style={{ color: colors.white, fontSize: 16 }}>
              {"Screen"}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default HeaderClass;
