import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ScrollView, StyleSheet, Alert } from 'react-native'
import { BrandHeaderText } from '../../_atoms/Text'
import { Container } from '../../_atoms/Container'
import {  View } from 'react-native-ui-lib'
import { Avatar } from 'react-native-elements'
import { TextInput } from '../../_molecules/TextInput'
import { IconButton } from '../../_atoms/Button'
import { NavigationHeader } from '../../_molecules/NavigationHeader'
import { addRecipe_API, editRecipe_API, deleteRecipe_API } from '../../../_utilities/_api/Recipe';

/* This page is used for 
    - ADDING a NEW RECIPE 
    - EDITING an EXISTING RECIPE

    NOTE: The "id" attribute in the "itemDetails" object is used by the "EditButtonGroup" to determine which action to call.
        -> if the "id" attribute is "null", then it is assumed that the user is ADDING a NEW RECIPE
        -> else, then it is assumed that the user is EDITING an EXISTING RECIPE
*/

const ButtonGroup = styled.View`
    flexDirection: column
`;

export default EditRecipePage = (props) => {
    const [title, setTitle] = useState("")
    const [calories, setCalories] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [instructions, setInstructions] = useState("")
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);

    const preload = () => {
        if (props.route.params.itemDetails) {
            /* NOTE: If a user is in this page to EDIT an EXISTING RECIPE, the "id" field of "itemDetails" is a number, and WILL NOT BE NULL. */ 
            setTitle(props.route.params.itemDetails.title);
            setCalories(String(props.route.params.itemDetails.calories));
            setIngredients(props.route.params.itemDetails.ingredients);
            setInstructions(props.route.params.itemDetails.instructions);
            setId(props.route.params.itemDetails.id);
            setLoading(false)
        } else {
            /* NOTE: If a user is in this page to ADD a NEW RECIPE, the "id" field of "itemDetails" is null */ 
            setLoading(false)
        }
    }
    
    useEffect(preload)

    const handleSave = () => {
        if (id) {
            const values = {
                data: {
                    title,
                    calories,
                    ingredients,
                    instructions
                }, 
                foodItemID: id
            }

            editRecipe_API(values)
            props.navigation.goBack()
        } else {
            console.log({ title, calories, ingredients, instructions, custom: true })
            addRecipe_API({ title, calories, ingredients, instructions, custom: true })
            props.navigation.goBack()
        }
    }

    const handleDelete = () => {
        if (id) {
            deleteRecipe_API(Number(id));
            props.navigation.goBack()
        } else {
            Alert.alert(
                "Are you sure you want to leave without saving?",
                "",
                [
                  {
                    text: "Confirm",
                    onPress: () => props.navigation.goBack(),
                    style: "default",
                  }, 
                  {
                    text: "Cancel",
                    style: "cancel"
                  }
                ]
              );
        }
    };

    if (loading) {
        return (<BrandHeaderText>Loading</BrandHeaderText>)
    } else {
        return (<Container>
            <NavigationHeader goTo={() => props.navigation.goBack()} />
            <ScrollView containerStyle={{flex: 0.8, flexDirection: 'column', }}>
                <View marginT-40 style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'center'}}>
                    <Avatar containerStyle={{height: 200, width: 200}} rounded source={require('../../../assets/signuppageicon.png')}/>
                </View>
                <View style ={{flex: 0.6}}>
                    <TextInput label="Name" stacked="20px" placeholder={title} onChangeText={val => setTitle(val)} value={title}/>
                    <TextInput label="Calories" stacked="10px" placeholder={String(calories)} onChangeText={setCalories} value={calories} keyboardType="numeric" />
                    <TextInput multiline={true} label="Ingredients" placeholder={ingredients} onChangeText={setIngredients} value={ingredients}/>
                    <TextInput multiline={true} label="Instructions" placeholder={instructions} onChangeText={val => setInstructions(val)} value={instructions}/>
                </View>
            </ScrollView>

            <View style={{flexDirection: 'row', justifyContent: 'space-between' , alignItems: 'center', width:320}}>
                <IconButton buttonStyle={styles.button} iconSize={19} buttonColor="#E53E3E" iconName= "trash" onPress={handleDelete} ></IconButton>
                <IconButton buttonStyle={styles.button} iconSize={19} buttonColor="#319795" iconName= "save" onPress={handleSave} ></IconButton>
            </View>
        </Container>)
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
