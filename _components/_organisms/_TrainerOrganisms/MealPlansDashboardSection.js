import React, { useState, useReducer, createContext } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import { MealPlan } from '../../_molecules/MealPlan';
import { FoodItem } from '../../_molecules/FoodItem';
import { MediumButton } from '../../_atoms/Button';
import { connect } from 'react-redux';
import { determineMealType } from '../../../_utilities/_helperFunctions/determineMealType';
import { ButtonModal } from '../../_molecules/ButtonModal';
import { TextInputModal } from '../../_molecules/TextInputModal';
import { assignClientMealPlan_API } from '../../../_utilities/_api/Trainer';
import Modal from 'react-native-modal';

function mapStateToProps(state) {
	const { mealPlans, recipes } = state.recipe;
	return { mealPlans, recipes };
}

/************ Logic for FoodItem ************/
const selectedFoodItemActions = {
	SET_SELECTED_ITEM: "SET_SELECTED_ITEM",
}

function selectedFoodItemReducer (foodItemDetails, action) {
	switch(action.type) {
		case selectedFoodItemActions.SET_SELECTED_ITEM:
			return {foodItemID: action.payload};
		default:
			return foodItemDetails;
	}
}

/************ END ***********************/

/************ Logic for MealPlan ************/
const selectedMealPlanActions = {
	SET_SELECTED_MEAL_PLAN: "SET_SELECTED_MEAL_PLAN",
}

function selectedMealPlanReducer (mealPlanDetails, action) {
	switch(action.type) {
		case selectedMealPlanActions.SET_SELECTED_ITEM:
			return { mealPlan: action.payload };
		default:
			return mealPlanDetails;
	}
}
/************ END ***********************/

export const MealPlansDashboardSection = (props) => {
	const [selectedMealPlan, dispatchSelectedMealPlan] = useReducer(selectedMealPlanReducer, {
		mealPlan: null
	});

	const handleExpandMealPlan = (mealPlan) => {
		// Minimize meal plan
		if (mealPlan.id === selectedMealPlan.mealPlan.id) {
			dispatchSelectedMealPlan({ type: selectedMealPlanActions.SET_SELECTED_MEAL_PLAN, 
						   payload: null
			})
		} else {
			// Expand meal plan
			dispatchSelectedMealPlan({ type: selectedMealPlanActions.SET_SELECTED_MEAL_PLAN, 
						   payload: mealPlan
			})
		}
	} 

	const [selectedFoodItem, dispatchSelectedFoodItem] = useReducer(selectedFoodItemReducer, {
		foodItem: null
	})

	const handleSelectFoodItem = (foodItem) => {
		// Close Button modal and clear preloaded info
		if (foodItem.id === selectedFoodItem.foodItem.id) {
			dispatchSelectedFoodItem({ type: selectedFoodItemActions.SET_SELECTED_ITEM,
						   payload: null
			})
		} else {  // Show Button modal and preload info
			dispatchSelectedFoodItem({ type: selectedFoodItemActions.SET_SELECTED_ITEM,
						   payload: foodItem

			})
		}
	}

	/* View the details of the food item inside the meal plan template */
	const handleViewFoodItem = () => {
		props.navigation.push("Recipe", { itemDetails: selectedFoodItem })
	}

	/* Edit food item inside the meal plan template */
	const handleEditFoodItem = () => {
		alert(foodItem);
		// the details of the selected food item is given to the editPage to prefill the fields in the page
		props.navigation.push("EditRecipe", { itemDetails: selectedFoodItem }) 
	}

	/* Delete the food item inside the meal plan template */
	const handleDeleteFoodItem = (foodItem) => {
		/* CALL SOME API HERE */
		props.navigation.push("Dashboard")
	}

	/* Add a food item to the meal plan template */
	const handleAddFoodItem = (foodItem) => {
		
	}

	return (
		<>
		{/* Displays a popup with a list of buttons to interact with the foodItem */}
		<ButtonModal 
		modalVisible={selectedFoodItem.foodItem !== null} 
		handleClose={() => handleSelectFoodItem(selectedFoodItem)}

		variation="MealPlan_Trainer"
		handleViewFoodItem={handleViewFoodItem}
		handleEditFoodItem={handleEditFoodItem}
		handleDeleteFoodItem={handleDeleteFoodItem}
		/>

		<FlatList
		 data={props.mealPlans}
		 renderItem={({item}) => <MealPlan id={item.id} 
		 				   title={item.title}
						   recipes={item.meal}
		 				   open={item.id === selectedMealPlan.mealPlanID} 
						   setVisible={handleExpandMealPlan} 
						   navigation={props.navigation} 
						   setSelectedFoodItem={handleSelectFoodItem} 
						   variation="Trainer"
						   />}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		/>
		</>
	)
}

export default connect(mapStateToProps)(MealPlansDashboardSection);

/****** Modal that slides up to let user choose what recipes to add to the meal plan *********/

const selectRecipesModalContainer = styled.View`
	height: "80%"
`;

function selectRecipesModal({ isVisible, recipes, ...props }) {
	return (
		<Modal isVisible={isVisible} >
			<selectRecipesModalContainer>
			<FlatList
			data={recipes}
			renderItem={({ item }) => <FoodItem navigation={props.navigation} 
							itemDetails={item} 
							setModalVisible={setModalVisible} 
							setSelectedFoodItem={loadSelectedFoodItemDetails}
						/>}
			keyExtractor={(item) => item.id}
			style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
			contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
			/>
			</selectRecipesModalContainer>
		</Modal>
	)
}

