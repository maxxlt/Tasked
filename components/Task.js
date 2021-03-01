import * as React from "react";
import { Component } from "react";
import { View, Text, StatusBar, ScrollView } from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../assets/color";
const colours = {
  gray: "#a4a4a4",
};

const tasks = [
  //input sample task data.
  {
    task: "Workout",
    icon: "circle",
    theme: "#000",
    deadline: "8:00am",
  },
  {
    task: "Finish 3311 iteration",
    icon: "circle",
    theme: "#000",
    deadline: "12:00pm",
  },
  {
    task: "Meet with 3311 group",
    icon: "circle",
    theme: "#000",
    deadline: "3:00pm",
  },
  {
    task: "Get Snacks for Movie Night",
    icon: "circle",
    theme: "#000",
    deadline: "8:00pm",
  },
];

const Task = ({ task, icon, theme, deadline }) => {
  //customizing tasks sections
  return (
    <View
      style={{
        backgroundColor: colors.orange,
        flexDirection: "row",
        marginHorizontal: 10,
        marginVertical: 4,
        borderRadius: 8,
        paddingVertical: 20,
        paddingHorizontal: 12,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Entypo name="circle" size={14} color="black" />
        <View>
          <Text style={{ fontSize: 16, marginLeft: 5 }}>{task}</Text>
          <Text style={{ color: colors.black, fontSize: 12, marginLeft: 5 }}>
            {deadline}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}></View>
    </View>
  );
};

class TaskClass extends Component {
  render() {
    return (
      <View
        style={{
          //setting background color to orange
          flex: 1,
          backgroundColor: colors.orange,
        }}
      >
        <View style={{ backgroundColor: colors.orange }}>
          <View
            style={{
              padding: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}></View>
          </View>
          <View style={{ padding: 16 }}></View>
        </View>

        <View
          style={{
            padding: 20,
            flexDirection: "row",
            backgroundColor: colors.white,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, color: colours.gray }}>Today</Text>
        </View>
        <ScrollView
          style={{
            backgroundColor: colors.white,
          }}
        >
          {tasks.map((
            task //set task constructor values
          ) => (
            <Task
              task={task.task}
              icon={task.icon}
              theme={task.theme}
              deadline={task.deadline}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default TaskClass;
