import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { View, ScrollView, StatusBar } from 'react-native';
import { Container } from '../../_atoms/Container';
import { NavigationHeader } from '../../_molecules/NavigationHeader';
import { HeaderMediumText } from '../../_atoms/Text';
import { FAB, Provider } from '../../_molecules/FAB';
import CalorieTracker from '../../_organisms/CalorieTracker';
import { SectionButton } from '../../_atoms/Button';
import WeeklyChart from '../../_organisms/WeeklyChart';
import { connect } from 'react-redux';
import { createMealPlan_API } from '../../../_utilities/_api/Recipe';
import {  updateDailyCalories_API, getConsumedMeals_API, getFavouriteMeals_API, getWeeklyConsumedMeals_API } from '../../../_utilities/_api/User';
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
		const getDateArray = () => {
			const todate = new Date()// Sun Jun 27 2021 16:16:23 GMT+0800 (Singapore Standard Time)
			const today = todate.getDay() // 0 (sunday)
			const result = []
			for (let i = today; i >= 0; i--) {
				let currentDay = new Date(todate)
				currentDay.setDate(currentDay.getDate() - i)
				let value = {
					day: currentDay.getDate(),
					month: currentDay.getMonth() + 1,
					year: currentDay.getFullYear()
				}
				result.push(value)
			}
			return result
		}

		setTimeout(() => {
			getWeeklyConsumedMeals_API(getDateArray())
			getConsumedMeals_API(dateArgument, false);
			updateDailyCalories_API();
			getFavouriteMeals_API(); 
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

<<<<<<< HEAD
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

			<CreateMealPlanModal
				modalVisible={showCreateMealPlanModal}
				handleClose={handleCloseCreateMealPlanModal}
				onChangeText={(value) => setNewMealPlanName(value)}
				onPress={handleCreateMealPlan}
			/>

=======
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
>>>>>>> 8b3f49de236b96d1b32d75b35e41a133a50018b2
			</View>
			<FAB 
			variation="client"
			gotoMeals={() => props.navigation.push("Meals")}
			gotoAddCustomMeal={() => props.navigation.push("EditRecipe", { type: "Add" })}
			gotoAddMealPlan={() => setShowCreateMealPlanModal(true)}
			/>
		</Container>
	)
}

export default connect(mapStateToProps)(HomePage)