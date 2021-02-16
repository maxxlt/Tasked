import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const Item = (props) => (
    <View style={styles.item}>
      <Text style={styles.title}>{props.title}</Text>
      <Text>{props.date}</Text>
    </View>
  );

  
const Task_list = (props) => {
    const renderItem = ({ item }) => (
        <Item title={item.title} date ={item.date}/>
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
    });

export default Task_list;