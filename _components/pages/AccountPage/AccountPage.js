import React from 'react';
import styled from 'styled-components';
import { Container } from '../../_atoms/Container';
import { NavigationHeader } from '../../_molecules/NavigationHeader';
import { HeaderMediumText } from '../../_atoms/Text';
import { MediumButton } from '../../_atoms/Button';
import { InfoPanel } from '../../_organisms/InfoPanel';
import { TrainerPanel } from '../../_organisms/TrainerPanel';

const NameText = styled(HeaderMediumText)`
	textAlign: left;
	marginTop: 19px;
	marginBottom: 19px;
	marginLeft: 41px;
	marginRight: auto;
	flexWrap: wrap;
	alignSelf: flex-start;
`;

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

export default function AccountPage(props) {
	return (
		<Container>
			<NavigationHeader goTo={() => props.navigation.goBack()} />
			<NameText>Tan Ah Beng</NameText>
			<InfoPanel 
			 infoOne={InfoOne}
			 infoTwo={InfoTwo}
			 infoThree={InfoThree}
			 infoFour={InfoFour}
			/>

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

			<TrainerPanel
			/>

			<MediumButton
			label="Log Out"
			/>
		</Container>
	)
}

