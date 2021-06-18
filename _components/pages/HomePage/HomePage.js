import React from 'react';
import styled from 'styled-components';
import { Container } from '../../_atoms/Container';
import { NavigationHeader } from '../../_molecules/NavigationHeader';
import { HeaderMediumText } from '../../_atoms/Text';
import { FAB, Provider } from '../../_molecules/FAB';
import { CalorieTracker } from '../../_organisms/CalorieTracker';
import { SectionButton } from '../../_atoms/Button';

const WelcomeText = styled(HeaderMediumText)`
	textAlign: left;
	marginTop: 19px;
	marginBottom: 19px;
	marginLeft: 41px;
	marginRight: auto;
	flexWrap: wrap;
	alignSelf: flex-start;
`;

export default function HomePage(props) {
	return (
		<Container>
			<NavigationHeader icon="account" goBack={() => props.navigation.goBack()} />
			<WelcomeText>{`Welcome home, \nAh Beng`}</WelcomeText>

			<CalorieTracker />

			<SectionButton
			mainText="Eating History"
			subText="See what you've been eating"
			margin="21px"
			/>
			
			<FAB 
			gotoMeals={() => props.navigation.push("Meals")}
			/>
		</Container>
	
	)
}