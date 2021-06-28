import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import { Container } from '../../_atoms/Container';
import { NavigationHeader } from '../../_molecules/NavigationHeader';
import { HeaderMediumText } from '../../_atoms/Text';
import { FAB } from '../../_molecules/FAB';
import CalorieTracker from '../../_organisms/CalorieTracker';
import { SectionButton } from '../../_atoms/Button';
import WeeklyChart from '../../_organisms/WeeklyChart';
import { connect } from 'react-redux';
import { createMealPlan_API } from '../../../_utilities/_api/Recipe';
import {  updateDailyCalories_API, getConsumedMeals_API, getFavouriteMeals_API, getWeeklyConsumedMeals_API, getUserProfile_API } from '../../../_utilities/_api/User';
import { CreateMealPlanModal } from './CreateMealPlanModal';

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
	const { weeklyCalories, dailyCalories } = state.user
	return { username, weeklyCalories, dailyCalories };
}

export function HomePage(props) {
	const [loading, setLoading] = useState(true);
	const [showCreateMealPlanModal, setShowCreateMealPlanModal] = useState(false);
	const [newMealPlanName, setNewMealPlanName] = useState("");

	const loadData = () => {
		console.log("Loading data");
		const today = new Date();
		const dateArgument = {
			day: today.getDate(),
			month: today.getMonth() + 1,
			year: today.getFullYear()
		}


		setTimeout(() => {
			getWeeklyConsumedMeals_API()
			getConsumedMeals_API(dateArgument, false);
			updateDailyCalories_API();
			getFavouriteMeals_API(); 
			getUserProfile_API();
		},0);

		setLoading(false);
	}

	useEffect(loadData, []);

	const handleCreateMealPlan = () => {
		createMealPlan_API({ title: newMealPlanName })
		setNewMealPlanName("");
	}

	const handleCloseCreateMealPlanModal = () => {
		setShowCreateMealPlanModal(false);
		setNewMealPlanName("");
	}

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
			<View style={{flexDirection: 'column', alignItems: 'center'}}>
				<View style={{flex: 0.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
					{/* <WelcomeText style= {{ borderWidth: 0, marginTop: 10}}>{`Your Dashboard`}</WelcomeText> */}

					<CalorieTracker />

					<SectionButton
					mainText="Eating History"
					subText="See what you've been eating"
					margin="21px"
					onPress={() => props.navigation.push("EatingHistory")}
					/>
				</View>
				<View style={{flex: 0.4, marginTop: 50}}>
					<WeeklyChart weeklyCalories= {props.weeklyCalories} dailyCalories={props.dailyCalories}/>
				</View>
			</View>

			<FAB 
			variation="client"
			gotoMeals={() => props.navigation.push("Meals")}
			gotoAddCustomMeal={() => props.navigation.push("EditRecipe", { type: "Add" })}
			gotoAddMealPlan={() => setShowCreateMealPlanModal(true)}
			/>

			<CreateMealPlanModal
			modalVisible={showCreateMealPlanModal}
			handleClose={handleCloseCreateMealPlanModal}
			onPress={handleCreateMealPlan}
			onChangeText={setNewMealPlanName}
			value={newMealPlanName}
			/>
		</Container>
	)
}

export default connect(mapStateToProps)(HomePage)