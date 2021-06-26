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
    const [ingredients, setIngredients] = useState(null)
    const [instructions, setInstructions] = useState("")
    const [id, setId] = useState(null);

    const preload = () => {
        if (props.route.params && props.route.params.itemDetails) {
            /* NOTE: If a user is in this page to EDIT an EXISTING RECIPE, the "id" field of "itemDetails" is a number, and WILL NOT BE NULL. */ 
            const { id, title, ingredients, instructions, calories, servings, author, custom } = props.route.params.itemDetails;

            setId(id);
            setTitle(title);
            setCalories(calories);
            setIngredients(ingredients);
            setInstructions(instructions);

            alert(id);

        } else {
            /* NOTE: If a user is in this page to ADD a NEW RECIPE, the "id" field of "itemDetails" is null */ 
        }
    }
    
    useEffect(preload, [])

    return (
        <Container>
            <NavigationHeader goTo={() => props.navigation.goBack()} />
            <ScrollView containerStyle={{flex: 0.8, flexDirection: 'column', justifyContent: 'space-between'}}>
                <View marginT-40 style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'center'}}>
                    <Avatar containerStyle={{height: 200, width: 200}} rounded source={require('../../../assets/signuppageicon.png')}/>
                </View>
                <View style ={{flex: 0.6}}>
                    <TextInput label="Name" containerStyle={{flex:0.25}} stacked="20px" placeholder={title} onChangeText= {title => setTitle(title)} value={title}/>
                    <TextInput label="Calories" containerStyle={{flex:0.25}} stacked="0px" onChangeText={calories => setCalories(calories)} value={calories} />
                    <MultiLineTextInput label="Ingredients" placeholder={ingredients} onChangeText={ingredients => setIngredients(ingredients)} value={ingredients}/>
                    <MultiLineTextInput label="Instructions" placeholder={instructions} onChangeText= {instructions => setInstructions(instructions)} value={instructions}/>
                </View>
            </ScrollView>
            <View style={{flex: 0.2, flexDirection: 'column', justifyContent: 'flex-end'}}>
                <EditButtonGroup type={props.route.params.type} navigation={props.navigation} itemDetails={{ id, title, calories: Number(calories), ingredients, instructions }} />  
            </View>
        </Container>
    )
}
