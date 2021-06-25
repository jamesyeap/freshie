import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { View, ScrollView, StatusBar } from 'react-native';
import { Container } from '../../_atoms/Container';
import { NavigationHeader } from '../../_molecules/NavigationHeader';
import { HeaderMediumText } from '../../_atoms/Text';
import { FAB, Provider } from '../../_molecules/FAB';
import CalorieTracker from '../../_organisms/CalorieTracker';
import { SectionButton } from '../../_atoms/Button';
import { WeeklyChart } from '../../_molecules/WeeklyChart';
import { connect } from 'react-redux';
import { updateDailyCalories_API, getConsumedMeals_API } from '../../../_utilities/_api/User';

const WelcomeText = styled(HeaderMediumText)`
	textAlign: left;
	marginTop: 19px;
	marginBottom: 19px;
	marginLeft: 20px;
	marginRight: auto;
	flexWrap: wrap;
	alignSelf: flex-start;
`;

function mapStateToProps(state) {
	const { username } = state.auth;
	return { username };
}

export function HomePage(props) {
	const [loading, setLoading] = useState(true);

	const loadData = () => {
		console.log("Loading data");

		const today = new Date();
		const dateArgument = {
			day: today.getDate(),
			month: today.getMonth() + 1,
			year: today.getFullYear()
		}
		
		setTimeout(() => {
			getConsumedMeals_API(dateArgument, false);
			updateDailyCalories_API(); 
		}, 2000);

		setLoading(false);
	}

	useEffect(loadData, []);

	if (loading) {
		return (
			<Container>
				<HeaderMediumText>Loading...</HeaderMediumText>
			</Container>
		)
	}
	return (
		<Container>
			<NavigationHeader iconName="person-circle-outline" goTo={() => props.navigation.push("Account")} />
			<View style={{flexDirection: 'column', alignContent: 'flex-start'}}>
			<View style={{flex: 0.7, flexDirection: 'column', alignItems: 'center'}}>
				<WelcomeText style= {{ borderWidth: 0, marginTop: -5}}>{`Welcome home, \n${props.username}`}</WelcomeText>

				<CalorieTracker />

				<SectionButton
				mainText="Eating History"
				subText="See what you've been eating"
				margin="21px"
				onPress={() => props.navigation.push("EatingHistory")}
				/>
			</View>
			<View style={{flex: 0.3,marginTop: 100}}>
				<WeeklyChart/>
			</View>
			</View>
			<FAB 
			gotoMeals={() => props.navigation.push("Meals")}
			gotoAddCustomMeal={() => props.navigation.push("EditRecipe", { type: "Add" })}
			/>
		</Container>
	)
}

export default connect(mapStateToProps)(HomePage)