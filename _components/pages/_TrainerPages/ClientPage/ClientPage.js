import React, { useState } from 'react';
import styled from "styled-components";
import Collapsible from 'react-native-collapsible';
import { Ionicons } from '@expo/vector-icons';

import { MediumText } from '../../../_atoms/Text';
import { Container } from '../../../_atoms/Container';
import { InfoPanel } from '../../../_organisms/InfoPanel';
import { AccountPanel } from '../../../_molecules/AccountPanel';
import { NavigationHeader } from '../../../_molecules/NavigationHeader'
import MealPlansSection from '../../../_organisms/_TrainerOrganisms/MealPlansSection';

import { connect } from 'react-redux';

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

const InfoSeven = {
	label: "Today's Calories",
	value: 500,
	unit: "kcal"
}

const InfoEight = {
	label: "Target Calories",
	value: 2500,
	unit: "kcal"
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


export default function ClientPage(props) {
	const [showBiometrics, setShowBiometrics] = useState(true);
	const [showCaloricInformation, setShowCaloricInformation] = useState(false);
	const [showMealPlans, setShowMealPlans] = useState(false);
	
	const { first_name, last_name, mealPlans, email, username } = props.route.params.clientDetails.user;

	const mealPlanContainerStyle = {backgroundColor: "#FFFFFF", width: 355, height: 150, borderRadius: 10};

	return (
		<Container>
			<NavigationHeader  goTo={() => props.navigation.goBack()} />
			<AccountPanel
			firstName={first_name}
			lastName={last_name}
			username={username}
			email={email}
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
				infoThree={InfoSeven}
				infoFour={InfoEight}
				/>
			</Collapsible>


			<SectionToggleButton onPress={() => setShowMealPlans(!showMealPlans)} IsToggled={showMealPlans} label="Meal plans"/>
			<Collapsible collapsed={!showMealPlans}>
				<MealPlansSection clientDetails={props.route.params.clientDetails.user} assignedMealPlansID={mealPlans} style={mealPlanContainerStyle} horizontal={true} navigation={props.navigation} />
			</Collapsible>


		</Container>
	)
}
