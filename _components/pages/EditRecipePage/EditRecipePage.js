import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { BrandHeaderText } from '../../_atoms/Text'
import { Container } from '../../_atoms/Container'
import { View } from 'react-native-ui-lib'
import { Avatar } from 'react-native-elements'
import { TextInput } from '../../_molecules/TextInput'
import { IconButton } from '../../_atoms/Button'
import { NavigationHeader } from '../../_molecules/NavigationHeader'
import { useDispatch } from 'react-redux'
import { addRecipe_API, editRecipe_API, deleteRecipe_API } from '../../../_redux/actions/Recipes.actions';

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
    const [image, setImage] = useState(require('../../../assets/signuppageicon.png'))

    const dispatch = useDispatch()

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
    
    useEffect(preload, [])

    const alertLeave = async () => Alert.alert(
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

    const handleSave = async () => {
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

            dispatch(editRecipe_API(values))
            props.navigation.goBack()
        } else {
            console.log({ title, calories, ingredients, instructions, custom: true })
            const status = dispatch(addRecipe_API({ title, calories, ingredients, instructions, custom: true }))

            if (status) {
                props.navigation.goBack()
            } 
        }
    }

    const handleDelete = () => {
        if (id) {
            dispatch(deleteRecipe_API(Number(id)));
            props.navigation.goBack()
        } else {
            return alertLeave()
        }
    };

    // const onImagePicker = async () => {
	// 	let perms = await ImagePicker.getMediaLibraryPermissionsAsync()
	// 	if (perms.accessPrivileges === "none") {
	// 		perms = await ImagePicker.requestMediaLibraryPermissionsAsync()
	// 		if (perms.accessPrivileges === "none") {
	// 		alert("Please go to settings and allow freshie to access your photos!")
	// 		}
	// 	} else {
	// 		let result = await ImagePicker.launchImageLibraryAsync({
	// 		mediaTypes: ImagePicker.MediaTypeOptions.All,
	// 		allowsEditing: true,
	// 		aspect: [4, 4],
	// 		quality: 1,
	// 		});

	// 		//console.log(result);
    //         console.log(image)
	// 		if (!result.cancelled) {
	// 		setImage({uri: result.uri});
	// 		}

    //         const response = await axios({
    //             method: "post",
    //             url: `${URL}/api/testing/`,
    //             headers: {
    //                 'content-type': 'multipart/form-data',
    //                 "Authorization": `Token ${token}`
    //             },
    //         })
    //         //console.log(image)
	// 	}
	// }

    if (loading) {
        return (<BrandHeaderText>Loading</BrandHeaderText>)
    } else {
        return (<Container>
            <NavigationHeader goTo={() => alertLeave()}/>
            <ScrollView containerStyle={{flex: 0.8, flexDirection: 'column', }}>
                <TouchableOpacity onPress={() => Alert.alert("Feature in progress! :P")} style={{ marginTop: 30, borderWidth:0 ,flex: 0.4, flexDirection: 'row', justifyContent: 'center'}}>
                    <Avatar containerStyle={{height: 200, width: 200}} rounded source={image}/>
                </TouchableOpacity>
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
