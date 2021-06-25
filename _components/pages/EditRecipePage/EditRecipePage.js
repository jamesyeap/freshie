import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { Image } from 'react-native-ui-lib'
import { BrandHeaderText } from '../../_atoms/Text'
import { Container } from '../../_atoms/Container'
import { Carousel, View } from 'react-native-ui-lib'
import { Avatar } from 'react-native-elements'
import { Header } from '../../_molecules/Header'
import { TextInput } from '../../_molecules/TextInput'
import { MultiLineTextInput } from '../../_molecules/MultiLineTextInput'
import { EditButtonGroup } from '../../_molecules/EditButtons'
import { NavigationHeader } from '../../_molecules/NavigationHeader'
import { editRecipe_API, deleteRecipe_API } from '../../../_utilities/_api/Recipe';

/* This page is used for 
    - ADDING a NEW RECIPE 
    - EDITING an EXISTING RECIPE

    NOTE: The "id" attribute in the "itemDetails" object is used by the "EditButtonGroup" to determine which action to call.
        -> if the "id" attribute is "null", then it is assumed that the user is ADDING a NEW RECIPE
        -> else, then it is assumed that the user is EDITING an EXISTING RECIPE
*/

export default EditRecipePage = (props) => {
    const [title, setTitle] = useState("")
    const [calories, setCalories] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [instructions, setInstructions] = useState("")

    let itemDetails = {};

    useEffect(() => {
        if (props.route.params && props.route.params.itemDetails) {
            /* NOTE: If a user is in this page to EDIT an EXISTING RECIPE, the "id" field of "itemDetails" is a number, and WILL NOT BE NULL. */ 
            const { id, title, ingredients, instructions, calories, servings, author, custom } = props.route.params.itemDetails;

            setTitle(title);
            setCalories(calories);
            setIngredients(ingredients);
            setInstructions(instructions);

            itemDetails = { id, title, ingredients, instructions, calories, servings, author, custom };
        } else {
            /* NOTE: If a user is in this page to ADD a NEW RECIPE, the "id" field of "itemDetails" is null */ 
            itemDetails = { id: null, title: "title", calories: "calories", ingredients: "ingredients", instructions: "instructions" }
        }
    }, []);
    
    return (
        <Container>
            <NavigationHeader goTo={() => props.navigation.goBack()} />
            <ScrollView containerStyle={{flex: 0.8, flexDirection: 'column', justifyContent: 'space-between'}}>
                <View marginT-40 style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'center'}}>
                    <Avatar containerStyle={{height: 200, width: 200}} rounded source={require('../../../assets/signuppageicon.png')}/>
                </View>
                <View style ={{flex: 0.6}}>
                    <TextInput containerStyle={{flex:0.25}} stacked= "20px" placeholder={itemDetails.title} onChangeText= {title => setTitle(title)} value= {title}/>
                    <TextInput containerStyle={{flex:0.25}} stacked= "0px" placeholder={itemDetails.calories} onChangeText= {calories => setCalories(calories)} value= {calories} />
                    <MultiLineTextInput style={{flex: 0.25}} placeholder={itemDetails.ingredients} onChangeText= {ingredients => setIngredients(ingredients)} value= {ingredients}/>
                    <MultiLineTextInput style={{flex: 0.25}} marginTop="20px" placeholder={itemDetails.instructions} onChangeText= {instructions => setInstructions(instructions)} value= {instructions}/>
                </View>
            </ScrollView>
            <View style={{flex: 0.2, flexDirection: 'column', justifyContent: 'flex-end'}}>
                <EditButtonGroup type= {props.route.params.type} navigation={props.navigation} itemDetails={{ id: itemDetails.id, title, calories, ingredients, instructions }} />  
            </View>
        </Container>
    )
}
