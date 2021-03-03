import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Appbar from './Appbar'




const MyTask = () => {
    return (
        <View>
            <Appbar title="Tasks"/>
            <Text>My Tasks</Text>

        </View>
    )
}

export default MyTask

const styles = StyleSheet.create({
    
})
