import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'

const Appbar = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.title}</Text>
            <Image style ={styles.image} source ={require('../assets/img/android/logo-black-text.png')}></Image>
        </View>
    )
}

export default Appbar

const styles = StyleSheet.create({
    container:{
        //flex:1,
        alignContent:'center',
        alignItems:'center',
        backgroundColor:'#FCCF3E',
        height:90,
        marginTop:40,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        marginBottom:15
    },
    image:
    {height:40, width:40, borderRadius:5},
    text:{
        padding:5
    }
})
