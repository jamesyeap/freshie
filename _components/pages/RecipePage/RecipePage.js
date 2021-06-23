import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Image } from 'react-native-ui-lib'
import { BrandHeaderText, HeaderMediumText, MediumText, RegularText, SubHeaderText } from '../../_atoms/Text'
import { Container } from '../../_atoms/Container'
import { Carousel, View } from 'react-native-ui-lib'
import { Avatar } from 'react-native-elements'
import { Header } from '../../_molecules/Header'
import { TextInput } from '../../_molecules/TextInput'
import { MultiLineTextInput } from '../../_molecules/MultiLineTextInput'
import { EditButtonGroup } from '../../_molecules/EditButtons'
import { NavigationHeader } from '../../_molecules/NavigationHeader'
import { Description } from '../../_molecules/Description'
import { BigButton } from '../../_atoms/Button'
import { Divider } from 'react-native-elements';

const ingredients = `- 6 chicken thighs, bone in or out, with or without skin \n
- Salt and pepper, to season\n
- 2 teaspoons garlic powder, to season\n
- 6 cloves garlic, crushed\n
- 1/3 cup honey\n
- 1/4 cup water (or chicken broth)\n
- 2 tablespoons rice wine vinegar (or apple cider vinegar, or any white vinegar)\n
- 1 tablespoon soy sauce`

const instructions = `1. Season chicken with salt, pepper and garlic powder set aside.
2. Heat a pan or skillet over medium high heat; sear chicken thigh fillets or breast fillets on both sides until golden and cooked through.

FOR BONE IN THIGHS:
3. Reduce heat after searing on both sides, cover skillet with a lid and continue cooking until the chicken is cooked through, while turning every 5 minutes until done. Alternatively, see notes for oven method.
4. Drain most of the excess oil from the pan, leaving about 2 tablespoons of pan juiced for added flavour.

FOR SAUCE:
5. When chicken is done and cooked through, arrange chicken skin-side up in the pan (if cooking with skin); add the garlic between the chicken and fry until fragrant (about 30 seconds). Add the honey, water, vinegar and soy sauce. Increase heat to medium-high and continue to cook until the sauce reduces down and thicken slightly (about 3-4 minutes).
6. Garnish with parsley and serve over vegetables, rice, pasta or with a salad.`


const styles = StyleSheet.create(
    {
        description:{
            margin: 10,
            borderWidth:0,
            width: "90%",
            alignSelf: 'center'
        }
    }
)

const Divided = () => <Divider width= {2} color="#319795" style= {{ width: "40%", alignSelf: 'center', marginVertical: 20}}></Divider>

export default RecipePage = (props) => {
    return (
        <Container>
            <NavigationHeader/>
            <ScrollView containerStyle={{flex: 0.8, flexDirection: 'column'}} style={{borderWidth:0, width:"100%"}}>
                <View marginT-20 style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'center'}}>
                    <Avatar containerStyle={{height: 200, width: 200}} rounded source={require('../../../assets/signuppageicon.png')}/>
                </View>
                <View style ={{flex: 0.5, borderWidth:0, justifyContent: 'space-around'}}>
                    <HeaderMediumText style={{flex: 1, alignSelf: 'center', marginTop:15}}>chicken</HeaderMediumText>
                    <Description style={styles.description} title= "Ingredients" text= {ingredients}></Description>
                    <Divided/>
                    <Description style={styles.description}  title= "Instructions" text= {instructions}></Description>
                    <Divided/>
                    <Description style={styles.description}  title= "Calories" text= "300"></Description>
                </View>
            </ScrollView>
            <BigButton label="Done!"></BigButton>
        </Container>
    )
}
