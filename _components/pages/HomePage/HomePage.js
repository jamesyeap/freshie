import React from 'react';
import styled from 'styled-components';
import { View, ScrollView } from 'react-native';
import { Container } from '../../_atoms/Container';
import { NavigationHeader } from '../../_molecules/NavigationHeader';
import { HeaderMediumText } from '../../_atoms/Text';
import { FAB, Provider } from '../../_molecules/FAB';
import { CalorieTracker } from '../../_organisms/CalorieTracker';
import { SectionButton } from '../../_atoms/Button';
import { WeeklyChart } from '../../_molecules/WeeklyChart';
import { Center } from '@chakra-ui/react';

const WelcomeText = styled(HeaderMediumText)`
	textAlign: left;
	marginTop: 19px;
	marginBottom: 19px;
	marginLeft: 20px;
	marginRight: auto;
	flexWrap: wrap;
	alignSelf: flex-start;
`;

export default function HomePage(props) {
	return (
		<Container>
			<NavigationHeader icon="account" goBack= {() => props.navigation.goBack()}/>
			<View style={{flexDirection: 'column', alignContent: 'flex-start'}}>
			<View style={{flex: 0.7, flexDirection: 'column', alignItems: 'center'}}>
				<WelcomeText style= {{ borderWidth: 0, marginTop: -5}}>{`Welcome home, \nAh Beng`}</WelcomeText>
				<View style={{borderWidth: 1, marginTop: -5}}>
				<CalorieTracker />
				</View>

				<SectionButton
				mainText="Eating History"
				subText="See what you've been eating"
				margin="21px"
				onPress= {() => props.navigation.push("EatingHistory")}
				/>
			</View>
			<View style={{flex: 0.3,marginTop: 100}}>
				<WeeklyChart/>
			</View>
			</View>
			<FAB 
			gotoMeals={() => props.navigation.push("Meals")}
			/>
		</Container>
	
	)
}