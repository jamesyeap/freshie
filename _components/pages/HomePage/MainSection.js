import React, { useState } from 'react'
import { View, Animated, StyleSheet, useWindowDimensions, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { RegularText, HeaderMediumText } from '../../_atoms/Text';
import CalorieTracker from '../../_organisms/CalorieTracker';
import { SectionButton } from '../../_atoms/Button';
import WeeklyChart from '../../_organisms/WeeklyChart';
import { FAB } from '../../_molecules/FAB';
import { CreateMealPlanModal } from './CreateMealPlanModal';
import { createMealPlan_API } from '../../../_redux/actions/Recipes.actions';

const { height } = Dimensions.get('window');

export function Header({ scrolling }) {
	const { username } = useSelector(state => state.auth)

	const translation = scrolling.interpolate({
		inputRange: [0, height, 2 * height],
		outputRange: [-130, 0, -130],
		extrapolate: 'clamp',
	  })

	 const opacity = scrolling.interpolate({
		inputRange: [0, height,  2 * height],
		outputRange: [0, 1, 0],
		extrapolate: 'clamp',
	 })

	return (
		<>
		<Animated.View
			style={{
				...styles.header,
				transform: [
					{ translateY: translation }
				]
			}}
			opacity={opacity}
		>	
			<View style={styles.headerText}>
				<RegularText>Welcome back,</RegularText>
				<HeaderMediumText style={{ textAlign: 'left' }}>
					{username}!
				</HeaderMediumText>
			</View>
		</Animated.View>
	</>
	)
}

export default function MainSection(props) {
	const { weeklyCalories, dailyCalories } = useSelector(state => state.client);
	const [showCreateMealPlanModal, setShowCreateMealPlanModal] = useState(false);
	const [newMealPlanName, setNewMealPlanName] = useState("");

	const dispatch = useDispatch()

	const handleCreateMealPlan = () => {
		dispatch(createMealPlan_API({ title: newMealPlanName }))
		setNewMealPlanName("");
	}

	const handleCloseCreateMealPlanModal = () => {
		setShowCreateMealPlanModal(false);
		setNewMealPlanName("");
	}
	
	return (
		<View style={{ ...styles.wrapper, height: height }}>
			<View style={styles.container}>
				<CalorieTracker />

				<SectionButton
				mainText="Eating History"
				subText="See what you've been eating"
				margin="21px"
				onPress={() => props.navigation.push("EatingHistory")}
				/>
			</View>

			<View style={{flex: 0.2, marginTop: 50}}>
				<WeeklyChart weeklyCalories={weeklyCalories} dailyCalories={dailyCalories}/>
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
		</View>
	)
	
}

const styles = StyleSheet.create({
	wrapper: {
		// flex: 1,
		// paddingTop: Constants.statusBarHeight,
		height: height,
	},
	container: {
		flex: 0.7,
		paddingTop: 150,
		flexDirection: "column",
		alignItems: "center",
	},
	header: {
		position: 'absolute',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		top: 0,
		left: 0,
		right: 0,
		height: 130,
		backgroundColor: "#93C5FD",
		padding: 20,
		zIndex: 1000,
	}, 
	headerText: {
		flexDirection: "column",
		paddingLeft: 30
	}
})