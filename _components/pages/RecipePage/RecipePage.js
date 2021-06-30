import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { HeaderMediumText } from '../../_atoms/Text'
import { Container } from '../../_atoms/Container'
import { View } from 'react-native-ui-lib'
import { Avatar } from 'react-native-elements'
import { NavigationHeader } from '../../_molecules/NavigationHeader'
import { Description } from '../../_molecules/Description'
import { BigButton } from '../../_atoms/Button'
import { Divider } from 'react-native-elements';

const Divided = () => <Divider width= {2} color="#319795" style= {{ width: "40%", alignSelf: 'center', marginVertical: 20}}></Divider>

export default RecipePage = (props) => {

    const itemDetails = props.route.params.itemDetails;

    return (
        <Container>
            <NavigationHeader/>
            <ScrollView containerStyle={{flex: 0.8, flexDirection: 'column'}} style={{borderWidth:0, width:"100%"}}>
                <View marginT-20 style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'center'}}>
                    <Avatar containerStyle={{height: 200, width: 200}} rounded source={require('../../../assets/signuppageicon.png')}/>
                </View>
                <View style ={{flex: 0.5, borderWidth:0, justifyContent: 'space-around'}}>
                    <HeaderMediumText style={{flex: 1, alignSelf: 'center', marginTop:15}}>{ itemDetails.title }</HeaderMediumText>
                    <Description style={styles.description} title= "Ingredients" text= { itemDetails.ingredients }></Description>
                    <Divided/>
                    <Description style={styles.description}  title= "Instructions" text={ itemDetails.instructions }></Description>
                    <Divided/>
                    <Description style={styles.description}  title= "Calories" text={ itemDetails.calories } ></Description>
                </View>
            </ScrollView>
            <BigButton label="Done!" onPress={() => props.navigation.goBack()}></BigButton>
        </Container>
    )
}

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
