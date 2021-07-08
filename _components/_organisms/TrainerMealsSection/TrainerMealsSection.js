import React, { useState } from 'react';
import { FlatList, Dimensions, Animated, StyleSheet, View } from 'react-native';
import { MealPlan } from '../../_molecules/MealPlan';
import { addConsumedMeal_API } from '../../../_redux/actions/Client.actions';
import { BrandHeaderText } from '../../_atoms/Text';
import { addRecipeToMealPlan_API, deleteMealPlan_API, getRecipeList_API, getMealPlans_API } from '../../../_redux/actions/Recipes.actions'
import { useSelector, useDispatch } from 'react-redux';
import { determineMealType } from '../../../_utilities/_helperFunctions/determineMealType';
import { MealButtonModal } from './MealButtonModal';
import { MealPlanButtonModal } from './MealPlanButtonModal';
import Constants from 'expo-constants';

const { height, width } = Dimensions.get('window')

export function Header({ scrolling }) {
	const translation = scrolling.interpolate({
		inputRange: [-width, 0 , width],
		outputRange: [-130, 0, -130],
		extrapolate: 'clamp',
	  })

	 const opacity = scrolling.interpolate({
		inputRange: [-width, 0 , width],
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
			<View style={styles.headerTextContainer}>
				<BrandHeaderText style={styles.headerText}>Your Meal Plans!</BrandHeaderText>
			</View>
		</Animated.View>
	</>
	)
}

export default function TrainerMealsSection (props) {
	const [selectedMealPlan, setSelectedMealPlan] = useState(null);
	const [selectedFoodItem, setSelectedFoodItem] = useState(null);
	const [mealModalVisible, setMealModalVisible] = useState(false);
	const [mealPlanModalVisible, setMealPlanModalVisible] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const { mealPlans } = useSelector(state => state.recipe);

	const dispatch = useDispatch()

	const handleSelectFoodItem = (foodItemDetails) => {
		setSelectedFoodItem(foodItemDetails);
		setMealModalVisible(true);
	}

	const handleCloseMealModal = () => {
		setSelectedFoodItem(null);
		setMealModalVisible(false);
	}

	/* ********** Functions for the ButtonModal pop-up ********** */ 
	const handleConsume = () => {
		const obj = { recipeID: selectedFoodItem.id, mealType: determineMealType() }
		dispatch(addConsumedMeal_API(obj));
		props.navigation.navigate("Home");
	}

	const handleView = () => {
		props.navigation.push("Recipe", { itemDetails: selectedFoodItem })
	}

	const handleEdit = () => {
		// redirects the user to the "EditRecipe" page that is pre-filled with all the item's info
		props.navigation.push("EditRecipe", { itemDetails: selectedFoodItem });
	}

	/* Delete food item from meal plan */
	const handleDeleteFoodItem = () => {
		let currRecipes = [];

		selectedMealPlan.recipes.forEach(x => currRecipes.push(x.id));
		const removeFoodItemID = selectedFoodItem.id;

		currRecipes = currRecipes.filter(x => x !== removeFoodItemID);
		console.log(currRecipes);
		
		dispatch(addRecipeToMealPlan_API({ mealPlanID: selectedMealPlan.id, 
					  mealPlanTitle: selectedMealPlan.title,
					  recipeIDList: currRecipes
		}))

		setSelectedFoodItem(null);
	}

	const handleExpandMealPlan = (mealPlanDetails) => {
		if (!selectedMealPlan) {
			setSelectedMealPlan(mealPlanDetails);
		} else {
			setSelectedMealPlan(null);
		}
	}

	const handleSelectMealPlan = (mealPlanDetails) => {
		setSelectedMealPlan(mealPlanDetails)
		setMealPlanModalVisible(true)
	}

	const handleAddFoodItem = async () => {
		dispatch(getRecipeList_API("search"));
		props.navigation.push("Search", { mealPlan: selectedMealPlan, variation: "ChooseRecipe" })
	}

	const handleDeleteMealPlan = () => {
		dispatch(deleteMealPlan_API(selectedMealPlan.id));
	}

	const handleCloseMealPlanModal = () => {
		setSelectedMealPlan(null);
		setMealPlanModalVisible(false);
	}

	const handleRefresh = () => {
		setRefreshing(true);
		dispatch(getMealPlans_API());
		setRefreshing(false);
	}

	/* ************************************************************ */

	return (
		<>
		<MealButtonModal
		 modalVisible={mealModalVisible} 
		 handleView={handleView}
		 handleClose={handleCloseMealModal} 
		 handleConsume={handleConsume}
		 handleEdit={handleEdit}
		 handleDelete={handleDeleteFoodItem}
		 itemDetails={selectedFoodItem}
		/>

		<MealPlanButtonModal
		modalVisible={mealPlanModalVisible}
		handleAddFoodItem={handleAddFoodItem}
		handleDelete={handleDeleteMealPlan}
		handleClose={handleCloseMealPlanModal}
		itemDetails={selectedMealPlan}
		/>

		<FlatList
		 data={mealPlans}
		 renderItem={({item}) => <MealPlan id={item.id} 
		 				   key={item.id.toString()}
		 				   title={item.title}
						   recipes={item.meal}
		 				   open={selectedMealPlan !== null && item.id === selectedMealPlan.id && !mealPlanModalVisible} 
						   handleExpandMealPlan={handleExpandMealPlan}
						   navigation={props.navigation} 
						   setModalVisible={setMealModalVisible} 
						   setSelectedFoodItem={handleSelectFoodItem} 
						   handleSelectMealPlan={handleSelectMealPlan}

						   variation="Client"
						   />}
		 keyExtractor = { (item, index) => index.toString() }
		 style={styles.container}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		 horizontal={props.horizontal ? props.horizontal : false}
		 onRefresh={handleRefresh}
		 refreshing={refreshing}
		/>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		backgroundColor: "#FFFBEB",
		height: height,
		width: width,
	},
	header: {
		position: 'absolute',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		top: 30,
		left: 0,
		right: 0,
		height: 100,
		padding: 20,
		zIndex: 1000,
	}, 
	headerText: {
		fontSize: 28
	},
	headerTextContainer: {
		flexDirection: "column",
		paddingLeft: 10,
	}
})

