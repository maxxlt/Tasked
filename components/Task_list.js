import React, {useState} from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, TouchableHighlight, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Swipeable from 'react-native-swipeable';   

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

//edit function
const edit = () => {
  console.log('edit pressed')
}

//delete function
const deletep = () => {
  console.log('delete pressed')
}
const rightButtons = [
 <View style = {{ height:100, alignContent:'center', justifyContent:"center"}}>
   <TouchableOpacity style={{marginLeft:20}} onPress={edit}><MaterialIcons name="edit" size={30}></MaterialIcons></TouchableOpacity>
 </View>
 ,
 <View style = {{ height:100, alignContent:'center', justifyContent:"center"}}>
   <TouchableOpacity style={{marginLeft:20}} onPress={deletep}><MaterialIcons name="delete" size={30}></MaterialIcons></TouchableOpacity>
 </View>
];

const Item = (props) =>{
  const [check, setCheck] = useState(false); 
   
 
  return  (
    <Swipeable 
    rightButtons={rightButtons}>
      <View style={styles.item}>
        <View style ={styles.checkbox}>
            <CheckBox
              left
              checkedColor='grey'
              checked={check}
              onPress={() => setCheck(!check)}
            />
        </View>
        <View>
        {!check &&  <Text style={styles.title}>{props.title}</Text> }
        {!check && <Text style= {styles.date}>{props.date}</Text>  } 
        {check &&  <Text style={styles.title1}>{props.title}</Text> }
        {check && <Text style= {styles.date1}>{props.date}</Text>  }    
        </View>

        </View>
      </Swipeable>
  );

}
  
const Task_list = (props) => {
    const renderItem = ({ item }) => (
        <Item title={item.title} date ={item.completeBy} completed ={item.completed} />
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
      checkbox:{
        height:30,
        width:20,
        marginRight:25, 
        marginTop: 10
      },
      item: {
        backgroundColor: "white",
        shadowColor:'grey',
        elevation:2,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius:5,
        flexDirection: 'row'
      
      },
      title: {
        fontSize: 20,
        marginLeft:20,
      
        marginBottom:5
      },
   
      date:{
        marginLeft:25,
        color: 'grey'
      },
      title1: {
        fontSize: 20,
        marginLeft:20,
        textDecorationLine: 'line-through',
        marginBottom:5
      },
      date1:{
        marginLeft:25,
        textDecorationLine: 'line-through',
        color: 'grey'
      }
    });

export default Task_list;