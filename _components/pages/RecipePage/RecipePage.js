import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { RegularText, MediumText, HeaderMediumText, Button } from '../../_atoms/Text'
import { Container } from '../../_atoms/Container'
import { View } from 'react-native-ui-lib'
import { NavigationHeader } from '../../_molecules/NavigationHeader'
import { useNavigation } from '@react-navigation/native';
import { SmallButton, BigButton } from '../../_atoms/Button'
import Collapsible from 'react-native-collapsible';
import LottieView from 'lottie-react-native';
import SearchPage from '../../_organisms/FoodPricer/SearchPage'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { parseIngredients } from '../../../_utilities/_helperFunctions/parseIngredients';

const SectionToggleButtonContainer = styled.TouchableOpacity`
	flexDirection: row;
	justifyContent: space-between;
	alignItems: center;
	marginBottom: 10px;
    width: 300px;
`;

const SectionToggleButtonText = styled(MediumText)`
	fontSize: 16px;
	lineHeight: 24px;
`;

const { width } = Dimensions.get('window')

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

/* MOCK-DATA */
// ⊃ separates ingredients
// ¬ separates title and weight 
const mockIngredients = "Bread¬200g⊃Chicken¬500g⊃Fish100g"


export default function RecipePage(props) {
    const itemDetails = props.route.params.itemDetails;
    const [expandIngredients, setExpandIngredients] = useState(false);
    const [expandInstructions, setExpandInstructions] = useState(false);
	const LottieRef = useRef(null)
    const navigation = useNavigation()

    const bottomSheetModalRef = useRef(null);
;
    const handleExpand = () => {
        bottomSheetModalRef.current.present()
    }

    const handleClose = () => {
        bottomSheetModalRef.current?.dismiss();
        setSelectedIngredient(null)
      }

	const snapPoints = useMemo(() => ['60%'], []);
	const handleSheetChanges = useCallback((index) => {
		console.log('handleSheetChanges', index);
	}, []);

    /* WORK-IN-PROGRESS */
    const [selectedIngredient, setSelectedIngredient] = useState(null)
    const handleFindIngredient = (title) => {
        setSelectedIngredient(title)
    }

    useEffect(() => {
        if (selectedIngredient !== null) {
            handleExpand()
        }
    }, [selectedIngredient])

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
        <BottomSheetModalProvider>
        <Container>
            <NavigationHeader goTo={() => navigation.goBack()}/>

            <ScrollView containerStyle={{flex: 0.8, flexDirection: 'column',  alignItems: 'center', justifyContent: 'center' }} style={{borderWidth:0, width:"100%"}}>
                <View style={styles.titleContainer}>
                    <FoodIcon />
                    <View style={styles.description}>
                        <HeaderMediumText style={{ width: 180 }}>{ itemDetails.title }</HeaderMediumText>
                        <View row>
                            <MediumText>{ itemDetails.calories }</MediumText>
                            <RegularText> kcal</RegularText>
                        </View>
                    </View>
                </View>

                <View style ={{flex: 0.5, borderWidth:0, justifyContent: 'space-around', alignItems: 'center', justifyContent: 'center'}}>
                    <SectionToggleButton IsToggled={expandIngredients} onPress={() => setExpandIngredients(!expandIngredients)} label={"Ingredients You'll Need!"}/>
                    <Collapsible collapsed={!expandIngredients}>
                        <View style={{ width: 0.8 * width, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            {/* <MediumText>{ itemDetails.ingredients }</MediumText> */}

                        {
                            parseIngredients(itemDetails.ingredients).map(({ title, weight }) => (
                                <TouchableOpacity style={styles.ingredientContainer} onPress={() => handleFindIngredient(title)}>
                                    <MediumText style={styles.ingredientTitleText}>{title}</MediumText>
                                    <MediumText style={styles.ingredientWeightText}>{weight}</MediumText>
                                </TouchableOpacity>
                            ))
                        }


                            <SmallButton 
                                label="Open Ingredient Assistant" 
                                onPress={() => handleExpand()} 
                                buttonStyle={{ width: 200, alignSelf: 'flex-end' }}
                            />
                        </View>
                    </Collapsible>


                    <SectionToggleButton IsToggled={expandInstructions} onPress={() => setExpandInstructions(!expandInstructions)} label={"Instructions!"}/>
                    <Collapsible collapsed={!expandInstructions}>
                        <View style={{ width: 0.8 * width, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 10 }}>
                            <MediumText>{ itemDetails.instructions }</MediumText>
                        </View>
                    </Collapsible>


                </View>
            </ScrollView>

            <BottomSheetModal
				index={0}
				ref={bottomSheetModalRef}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
			>
				<SearchPage 
                    handleClose={handleClose}
                    handleExpand={handleExpand}
                    existingSearchQuery={selectedIngredient}
				/>
			</BottomSheetModal>
            
            <BigButton label="Done!" onPress={() => props.navigation.goBack()}></BigButton>
        </Container>
        </BottomSheetModalProvider>
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
    description: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    ingredientContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#A7F3D0",
        padding: 10, 
        margin: 5,
        borderRadius: 5,
        width: 0.8 * width
    },
    ingredientTitleText: {
        marginLeft: 25,
    },
    ingredientWeightText: {
        marginRight: 25
    }
})
