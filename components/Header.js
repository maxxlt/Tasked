import * as React from "react";
import { View, Text, StatusBar, Image, StyleSheet } from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  AntDesign,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const colors = {
  themeColor: "#FCCF3E", //color of background and plus button
  white: "#fff", //color of lettering and task circles
  background: "#a4a4a4", //color of tasks screen
  greyish: "#a4a4a4", //ask devasri what color was gray
  black: "#000", //color of edit and delete icons
};

const styles = StyleSheet.create({
  logo: {
    width: 66,
    height: 58,
  },
});

export default function Top(props) {
  //top row with the drop down, bell, person. //this needs to be deleted. //query bar (including magnify, mic, filter)
  return (
    <View
      style={{
        //setting background color to orange
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.themeColor} />
      <View style={{ backgroundColor: colors.themeColor }}>
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
          <Text style={{ color: colors.white, fontSize: 16 }}>{"Screen"}</Text>
        </View>
      </View>
    </View>
  );
}
