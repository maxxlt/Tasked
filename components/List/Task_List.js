import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import colors from "../../assets/color";
import { Entypo } from "@expo/vector-icons";


const Item = (props) => (
    <View
    style={styles.item1}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Entypo name="circle" size={14} color="black" />
      <View>
        <Text style={{ fontSize: 16, marginLeft: 5 }}>{props.title}</Text>
        <Text style={{ color: colors.black, fontSize: 12, marginLeft: 5 }}>
          {props.date}
        </Text>
      </View>
    </View>

    <View style={{ flexDirection: "row" }}></View>
  </View>
  );

  
const Task_list = (props) => {
    const renderItem = ({ item }) => (
        <Item title={item.title} date ={item.completeBy} />
      );
  return (
        <FlatList
        data={props.Data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        />
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
      item: {
        backgroundColor: '#FCCF3E',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius:20
      },
      title: {
        fontSize: 20,
      },
      item1:
        {
            backgroundColor: colors.orange,
            flexDirection: "row",
            marginHorizontal: 10,
            marginVertical: 4,
            borderRadius: 8,
            paddingVertical: 20,
            paddingHorizontal: 12,
            alignItems: "center",
            justifyContent: "space-between",
          }
      

    });

export default Task_list;