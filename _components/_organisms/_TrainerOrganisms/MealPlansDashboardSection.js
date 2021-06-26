import React, { useState, useReducer, createContext } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import { MealPlan } from '../../_molecules/MealPlan';
import { FoodItem } from '../../_molecules/FoodItem';
import { MediumButton } from '../../_atoms/Button';
import { connect } from 'react-redux';
import { determineMealType } from '../../../_utilities/_helperFunctions/determineMealType';
import { ButtonModal } from '../../_molecules/ButtonModal';
import { assignClientMealPlan_API } from '../../../_utilities/_api/Trainer';

function mapStateToProps(state) {
	const { mealPlans, recipes } = state.recipe;
	return { mealPlans, recipes };
}

/************ Logic for FoodItem ************/
const selectedFoodItemActions = {
	SET_SELECTED_ITEM: "SET_SELECTED_ITEM",
	SET_MODAL_VISIBLE: "SET_MODAL_VISIBLE",
}

function selectedFoodItemReducer (foodItemDetails, action) {
	switch(action.type) {
		case selectedFoodItemActions.SET_SELECTED_ITEM:
			return { ...foodItemDetails, foodItem: action.payload };
		case selectedFoodItemActions.SET_MODAL_VISIBLE:
			return { ...foodItemDetails, showModal: action.payload };
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
		case selectedMealPlanActions.SET_SELECTED_MEAL_PLAN:
			return { mealPlan: action.payload };
		default:
			return mealPlanDetails;
	}
}
/************ END ***********************/

export const MealPlansDashboardSection = (props) => {
	const [selectedMealPlan, dispatchSelectedMealPlan] = useReducer(selectedMealPlanReducer, {
		mealPlan: null,
		showModal: false
	});

	const handleExpandMealPlan = (mealPlan) => {
		// Minimize meal plan
		if (selectedMealPlan.mealPlan && mealPlan.id === selectedMealPlan.mealPlan.id) {
			console.log(mealPlan)
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
		foodItem: null,
		showModal: false
	})

	const handleSelectFoodItem = (foodItem) => {
		dispatchSelectedFoodItem({ type: selectedFoodItemActions.SET_MODAL_VISIBLE,
			payload: true
		})
		
		dispatchSelectedFoodItem({ type: selectedFoodItemActions.SET_SELECTED_ITEM,
					   payload: foodItem
		})

		console.log(foodItem);
		console.log(selectedFoodItem.foodItem);
	}

	/* View the details of the food item inside the meal plan template */
	const handleViewFoodItem = () => {
		console.log(selectedFoodItem);
		props.navigation.push("Recipe", { itemDetails: selectedFoodItem.foodItem })
	}

	/* Edit food item inside the meal plan template */
	const handleEditFoodItem = () => {
		// the details of the selected food item is given to the editPage to prefill the fields in the page
		props.navigation.push("EditRecipe", { itemDetails: selectedFoodItem.foodItem, type: "edit" }) 
	}

	/* Delete the food item inside the meal plan template */
	const handleDeleteFoodItem = (foodItem) => {
		/* CALL SOME API HERE */
		props.navigation.push("Dashboard")
	}

	/* Add a food item to the meal plan template */
	const handleAddFoodItem = () => {
		props.navigation.push("Search", { mealPlanID: selectedMealPlan.mealPlan.id, variation: "ChooseRecipe" })
	}

	const handleAssignToClient = (mealPlan) => {
		props.navigation.push("Search", { mealPlanID: selectedMealPlan.mealPlan.id, variation: "ChooseClient" })
	}

	return (
		<>
		{/* Displays a popup with a list of buttons to interact with the foodItem */}
		<ButtonModal 
		modalVisible={selectedFoodItem.showModal} 
		setModalVisible={(boolean) => dispatchSelectedFoodItem({ type: selectedFoodItemActions.SET_MODAL_VISIBLE, payload: boolean })}

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
		 				   open={selectedMealPlan.mealPlan !== null && item.id === selectedMealPlan.mealPlan.id} 
						   handleExpandMealPlan={handleExpandMealPlan} 
						   navigation={props.navigation} 
						   setSelectedFoodItem={handleSelectFoodItem} 

						   handleAddFoodItem={handleAddFoodItem}
						   handleAssignToClient={handleAssignToClient}

						   variation="Trainer"
						   />}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		/>
		</>
	)
}

export default connect(mapStateToProps)(MealPlansDashboardSection);

