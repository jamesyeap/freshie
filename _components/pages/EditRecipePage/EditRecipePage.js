import React from 'react'
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

export default EditRecipePage = () => {
    return (
        <Container>
            <BrandHeaderText>freshie</BrandHeaderText>
            <ScrollView style={{flex: 0.8}}>
            <View marginT-40 style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Avatar containerStyle={{height: 200, width: 200}} rounded source={require('../../../assets/signuppageicon.png')}/>
            </View>
            <TextInput stacked= "0" placeholder="title"/>
            <TextInput stacked= "-15" placeholder="calories"/>
            <MultiLineTextInput placeholder= "Ingredients"></MultiLineTextInput>
            <MultiLineTextInput marginTop="10px" placeholder= "Instructions"></MultiLineTextInput>
            </ScrollView>
            <View style={{flex: 0.2, flexDirection: 'column', justifyContent: 'flex-end'}}>
                <EditButtonGroup/>  
            </View>
        </Container>
    )
}
