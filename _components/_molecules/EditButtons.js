import React from 'react'
import { View } from 'react-native'
import { IconButton } from '../_atoms/Button'
import { StyleSheet } from 'react-native';
import { addRecipe_API, editRecipe_API, deleteRecipe_API } from '../../_utilities/_api/Recipe';

export const EditButtonGroup = (props) => {

    const handleSave = () => {
        if (props.itemDetails.id !== null) {
            editRecipe_API(props.itemDetails)
        } else {
            addRecipe_API(props.itemDetails)
        }
    }

    const handleCopy = () => {
        props.navigation.navigate("Meals");
    };

    const handleDelete = () => {
        props.navigation.navigate("Meals");
    };

    if (props.type == "edit") {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', width:320}}>
                <IconButton buttonStyle={styles.button} iconSize={19} buttonColor="#E53E3E" iconName= "trash" onPress={handleDelete} ></IconButton>
                <IconButton buttonStyle={styles.button} iconSize={19} buttonColor="#F6C243" iconName= "ios-copy" onPress={handleCopy} ></IconButton>
                <IconButton buttonStyle={styles.button} iconSize={19} buttonColor="#319795" iconName= "save" onPress={handleSave} ></IconButton>
            </View>
        )
    } else {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around', alignItems: 'center', width:320}}>
                <IconButton buttonStyle={styles.button} iconSize={19} buttonColor="#E53E3E" iconName= "trash" onPress={handleDelete} ></IconButton>
                <IconButton buttonStyle={styles.button} iconSize={19} buttonColor="#319795" iconName= "save" onPress={handleSave} ></IconButton>
            </View>
        ) 
    }
}

const styles = StyleSheet.create({
    button: {
        flex: 0.25,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        height: 30,
    },
})