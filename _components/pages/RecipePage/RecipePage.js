import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet } from 'react-native'
import { RegularText, MediumText, HeaderMediumText } from '../../_atoms/Text'
import { Container } from '../../_atoms/Container'
import { View } from 'react-native-ui-lib'
import { NavigationHeader } from '../../_molecules/NavigationHeader'
import { BigButton } from '../../_atoms/Button'
import Collapsible from 'react-native-collapsible';
import LottieView from 'lottie-react-native';

const SectionToggleButtonContainer = styled.TouchableOpacity`
	flexDirection: row;
	justifyContent: space-between;
	alignItems: center;
	width: 280px;
	marginBottom: 5px;
`;

const SectionToggleButtonText = styled(MediumText)`
	fontSize: 16px;
	lineHeight: 24px;
`;



const SectionToggleButton = (props) => {
	const iconToShow = props.IsToggled ? "chevron-up-circle" : "chevron-down-circle";
	return (
		<SectionToggleButtonContainer onPress={props.onPress}>
			<SectionToggleButtonText>{props.label}</SectionToggleButtonText>
			<Ionicons
			name={iconToShow}
			size={25}
			/>
		</SectionToggleButtonContainer>
	)
}

export default RecipePage = (props) => {
    const itemDetails = props.route.params.itemDetails;
    const [expandIngredients, setExpandIngredients] = useState(true);
    const [expandInstructions, setExpandInstructions] = useState(true);
	const LottieRef = useRef(null)

    const FoodIcon = () =>  <LottieView
                        ref={LottieRef}
                        style={{
                        width: 100,
                        height: 100,
                        marginRight: 30,
                        }}
                        source={require('../../../assets/60056-food.json')}
                        autoPlay
                        loop
                      /> 

    return (
        <Container>
            <NavigationHeader/>

            <ScrollView containerStyle={{flex: 0.8, flexDirection: 'column',  alignItems: 'center', justifyContent: 'center' }} style={{borderWidth:0, width:"100%"}}>
                <View style={styles.titleContainer}>
                    <FoodIcon />
                    <View style={styles.description}>
                        <HeaderMediumText>{ itemDetails.title }</HeaderMediumText>
                        <View row>
                            <MediumText>{ itemDetails.calories }</MediumText>
                            <RegularText> kcal</RegularText>
                        </View>
                    </View>
                </View>

                <View style ={{flex: 0.5, borderWidth:0, justifyContent: 'space-around', alignItems: 'center', justifyContent: 'center'}}>
                    <SectionToggleButton IsToggled={expandIngredients} onPress={() => setExpandIngredients(!expandIngredients)} label={"Ingredients You'll Need!"}/>
                    <Collapsible collapsed={!expandIngredients} containerStyle={{ alignItems: 'flex-start' }}>
                        <MediumText style={{ textAlign: 'left' }}>{ itemDetails.ingredients }</MediumText>
                    </Collapsible>


                    <SectionToggleButton IsToggled={expandInstructions} onPress={() => setExpandInstructions(!expandInstructions)} label={"Instructions!"}/>
                    <Collapsible collapsed={!expandInstructions}>
                        <MediumText>{ itemDetails.instructions }</MediumText>
                    </Collapsible>


                </View>
            </ScrollView>
            <BigButton label="Done!" onPress={() => props.navigation.goBack()}></BigButton>
        </Container>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 0.4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 20,
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D1D5DB',
        backgroundColor: '#FEF3C7'
    },
    description:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
})
