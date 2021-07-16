import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateClientTargetCalories_API } from '../../../../_redux/actions/Trainer.actions';
import styled from "styled-components";
import Collapsible from 'react-native-collapsible';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, StyleSheet, View } from 'react-native';

import { MediumText } from '../../../_atoms/Text';
import { TextInput } from '../../../_molecules/TextInput'
import { Container } from '../../../_atoms/Container';
import { InfoPanel } from '../../../_organisms/InfoPanel';
import { AccountPanel } from '../../../_molecules/AccountPanel';
import { NavigationHeader } from '../../../_molecules/NavigationHeader'
import MealPlansSection from '../../../_organisms/_TrainerOrganisms/MealPlansSection';
import { getClientMealPlan_API, getClientData_API } from '../../../../_redux/actions/Trainer.actions';
import { MediumButton } from '../../../_atoms/Button';

const InfoOne = {
	label: "Height",
	value: 180,
	unit: "cm"
}

const InfoTwo = {
	label: "Age",
	value: 30,
	unit: "years old"
}

const InfoThree = {
	label: "Weight",
	value: 75,
	unit: "kg"
}

const InfoFour = {
	label: "Target Weight",
	value: 70,
	unit: "kg"
}

const InfoFive = {
	label: "BMR",
	value: 70,
	unit: "kg"
}

const InfoSix = {
	label: "Activity Level",
	value: "Slightly Active",
}

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

const { height, width } = Dimensions.get('window')

export default function ClientPage(props) {
	const [showBiometrics, setShowBiometrics] = useState(false);
	const [showCaloricInformation, setShowCaloricInformation] = useState(true);
	const [showMealPlans, setShowMealPlans] = useState(false);
	const [showEditInputs, setShowEditInputs] = useState(false);
	const [mealPlansData, setMealPlansData] = useState(null);
	const [clientData, setClientData] = useState(null)
	const [loading, setLoading] = useState(true);
	const [targetCalories, setTargetCalories] = useState(null)
	const [propertyChanged, setPropertyChanged] = useState(false)

	const dispatch = useDispatch()

	/* Fetches meal plans for the client */
	const preload = async () => {
		const fetchClientData = async () => {
			const data = await getClientData_API(props.route.params.clientDetails.user.username)
			setClientData(data)
		}
		
		const fetchMealsData = async () => {
			const data = await getClientMealPlan_API(props.route.params.clientDetails.user.username)	
			setMealPlansData(data) 
		}

		await fetchClientData()
		await fetchMealsData()
		setLoading(false)
	}

	useEffect(() => {
		preload()
	}, [propertyChanged]);

	const handleUpdateTargetCalories = async () => {
		dispatch(updateClientTargetCalories_API(
			{
				clientUsername: username,
				targetCalories: targetCalories
			}
		))

		// force a re-render
		setPropertyChanged(!propertyChanged)
	}
	
	const { username } = props.route.params.clientDetails.user;

	const mealPlanContainerStyle = { backgroundColor: "#FFFFFF", width: 355, height: 150, borderRadius: 10 }

	if (loading) {
		return (
			<Container>
				<MediumText>Loading...</MediumText>
			</Container>
		)
	}
	
	return (<Container>
			<NavigationHeader  goTo={() => props.navigation.goBack()} />
			<AccountPanel
			firstName={clientData.user.first_name}
			lastName={clientData.user.last_name}
			username={clientData.user.username}
			email={clientData.user.email}
			/>

			<SectionToggleButton onPress={() => setShowBiometrics(!showBiometrics)} IsToggled={showBiometrics} label="Biometric details" />
			<Collapsible collapsed={!showBiometrics}>
				<InfoPanel 
				infoOne={InfoOne}
				infoTwo={InfoTwo}
				infoThree={InfoThree}
				infoFour={InfoFour}
				/>
			</Collapsible>

			<SectionToggleButton onPress={() => setShowCaloricInformation(!showCaloricInformation)} IsToggled={showCaloricInformation} label="Caloric information"/>
			<Collapsible collapsed={!showCaloricInformation}>
				<InfoPanel
				labelColor="#9A8EBA"
				valueColor="#FFFFFF"
				unitColor="#9A8EBA"
				backgroundColor="#583AAB"

				infoOne={InfoFive}
				infoTwo={InfoSix}
				infoThree={{
					label: "Today's Calories",
					value: clientData.calories.currentCalories,
					unit: "kcal"
				}}
				infoFour={{
					label: "Target Calories",
					value: clientData.calories.dailyCalories,
					unit: "kcal"
				}}
				/>
			</Collapsible>


			<SectionToggleButton onPress={() => setShowMealPlans(!showMealPlans)} IsToggled={showMealPlans} label="Meal plans"/>
			<Collapsible collapsed={!showMealPlans}>
				{!loading && 
					<MealPlansSection 
						data={mealPlansData} 
						clientDetails={props.route.params.clientDetails.user} 
						style={mealPlanContainerStyle} 
						horizontal={true} 
						navigation={props.navigation} 
					/>
				}
			</Collapsible>

			<SectionToggleButton onPress={() => setShowEditInputs(!showEditInputs)} IsToggled={showEditInputs} label="Update client info"/>
			<Collapsible collapsed={!showEditInputs}>
				<View style={styles.updateClientInfoContainer}>
					<TextInput 
						label="Update target calories"
						value={props.route.params.clientDetails.user}
						onChangeText={setTargetCalories}
						placeholder="500 kcal"
					/>

					<MediumButton 
						label="Update"
						onPress={handleUpdateTargetCalories}
					/>
				</View>
			</Collapsible>


		</Container>)
	
}

const styles = StyleSheet.create({
	updateClientInfoContainer: {
		width: 0.8 * width
	}
})
