import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  
const Group_List = (props) => {
    const renderItem = ({ item }) => (
        <Item title={item.title} />
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
        fontSize: 32,
      },
    });

export default Group_List;