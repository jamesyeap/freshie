import React, { useState } from 'react'
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




export default RecipeEditPage = () => {
    const [title, setTitle] = useState("")
    const [calories, setCalories] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [instructions, setInstructions] = useState("")
    
    return (
        <Container>
            <NavigationHeader/>
            <ScrollView containerStyle={{flex: 0.8, flexDirection: 'column', justifyContent: 'space-between'}}>
                <View marginT-40 style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'center'}}>
                    <Avatar containerStyle={{height: 200, width: 200}} rounded source={require('../../../assets/signuppageicon.png')}/>
                </View>
                <View style ={{flex: 0.6}}>
                    <TextInput containerStyle={{flex:0.25}} stacked= "20px" placeholder="title" onChangeText= {title => setTitle(title)} value= {title}/>
                    <TextInput containerStyle={{flex:0.25}} stacked= "0px" placeholder="calories" onChangeText= {calories => setCalories(calories)} value= {calories} />
                    <MultiLineTextInput style={{flex: 0.25}} placeholder= "Ingredients" onChangeText= {ingredients => setIngredients(ingredients)} value= {ingredients}/>
                    <MultiLineTextInput style={{flex: 0.25}} marginTop="20px" placeholder= "Instructions" onChangeText= {instructions => setIngredients(ingredients)} value= {instructions}/>
                </View>
            </ScrollView>
            <View style={{flex: 0.2, flexDirection: 'column', justifyContent: 'flex-end'}}>
                <EditButtonGroup/>  
            </View>
        </Container>
    )
}
