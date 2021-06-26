import React, { useState } from 'react';
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

function mapStateToProps(state) {
	const { mealPlans } = state.recipe;
	return { mealPlans };
}

export const MealPlansDashboardSection = (props) => {
	const [open, setOpen] = useState(null);
	const [selectedFoodItem, setSelectedFoodItem] = useState(null);
	const [selectedFoodItemDetails, setSelectedFoodItemDetails] = useState(null);
	const [buttonModalVisible, setButtonModalVisible] = useState(false);
	const [textModalVisible, setTextModalVisible] = useState(false);
	const [user, setUser] = useState(""); // stores the name of the user the meal is to be assigned to

	const setVisible = (id) => {
		if (id === open) {
			setOpen(null);
		} else {
			setOpen(id);
		}
	} 

	const handleEdit = () => {
		// redirects the user to the "EditRecipe" page that is pre-filled with all the item's info
		props.navigation.push("EditRecipe", { itemDetails: selectedFoodItemDetails[0] });
	}

	const handleDelete = () => {
		deleteRecipe_API(selectedFoodItem);
		props.navigation.navigate("Home");
	}

	const loadSelectedFoodItemDetails = (id) => {
		setSelectedFoodItem(id);

		let listOfRecipes = [];
		props.mealPlans.forEach(e => {
			e.meal.forEach(x => {
				listOfRecipes.push(x);
			})
		})
		
		const itemDetails = listOfRecipes.filter(foodItem => foodItem.id === id);
		setSelectedFoodItemDetails(itemDetails);
	}

	const handleAssignMealPlan = () => {
		const values = {
			clientUsername: user,
			mealPlanID: open
		};

		assignClientMealPlan_API(values);
		alert(`Meal plan ID: ${open} is now assigned to ${user}!`)
	}
	/* ************************************************************ */

	return (
		<>
		<ButtonModal 
		 modalVisible={buttonModalVisible} 
		 setModalVisible={setButtonModalVisible} 
		 handleEdit={handleEdit}
		 variation="MealPlan_Trainer"
		/>

		<TextInputModal
		modalVisible={textModalVisible}
		setModalVisible={setTextModalVisible}
		onChangeText={setUser}
		value={user}
		onPress={handleAssignMealPlan}
		/>

		<FlatList
		 data={props.mealPlans}
		 renderItem={({item}) => <MealPlan id={item.id} 
		 				   title={item.title}
						   recipes={item.meal}
		 				   open={open} 
						   setVisible={setVisible} 
						   navigation={props.navigation} 
						   setModalVisible={setButtonModalVisible} 
						   setSelectedFoodItem={loadSelectedFoodItemDetails} 
						   setTextModalVisible={setTextModalVisible}
						   variation="Trainer"
						   />}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		/>
		</>
	)
}

export default connect(mapStateToProps)(MealPlansDashboardSection)

