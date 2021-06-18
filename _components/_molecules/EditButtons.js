import React from 'react'
import { View } from 'react-native'
import { IconButton } from '../_atoms/Button'
import { StyleSheet } from 'react-native'

export const EditButtonGroup = () => {
    return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', width:320}}>
            <IconButton buttonStyle={styles.button} iconSize={19} buttonColor="#E53E3E" iconName= "trash"></IconButton>
            <IconButton buttonStyle={styles.button} iconSize={19} buttonColor="#F6C243" iconName= "ios-copy"></IconButton>
            <IconButton buttonStyle={styles.button} iconSize={19} buttonColor="#319795" iconName= "save"></IconButton>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 0.25,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        height: 30,
    },
})