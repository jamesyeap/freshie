import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import { MealPlan } from '../_molecules/MealPlan';
import { FoodItem } from '../_molecules/FoodItem';
import { ButtonModal } from '../_molecules/ButtonModal';
import { addConsumedMeal_API } from '../../_utilities/_api/User';
import { deleteRecipe_API } from '../../_utilities/_api/Recipe'
import { connect } from 'react-redux';
import { determineMealType } from '../../_utilities/_helperFunctions/determineMealType';

// mock example
const data = [
	{
		id: 0,
		name: "Taco",
	},
	{
		id: 1,
		name: "Pizza"
	},
	{
		id: 2,
		name: "Bread"
	}

]

function mapStateToProps(state) {
	const { mealPlans } = state.recipe;
	return { mealPlans };
}

export const TrainerMealsSection = (props) => {
	const [open, setOpen] = useState(null);
	const [selectedFoodItem, setSelectedFoodItem] = useState(null);
	const [selectedFoodItemDetails, setSelectedFoodItemDetails] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const styles = props.style ? props.style : { backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }

	const setVisible = (id) => {
		if (id === open) {
			setOpen(null);
		} else {
			setOpen(id);
		}
	} 

	/* ********** Functions for the ButtonModal pop-up ********** */ 
	const handleConsume = () => {
		console.log(selectedFoodItem);
		const obj = { recipeID: Number(selectedFoodItem), mealType: determineMealType() }
		addConsumedMeal_API(obj);
		props.navigation.navigate("Home");
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
	/* ************************************************************ */

	return (
		<>
		<ButtonModal 
		 modalVisible={modalVisible} 
		 setModalVisible={setModalVisible} 
		 handleConsume={handleConsume}
		 handleEdit={handleEdit}
		 handleDelete={handleDelete}
		 variation="MealPlan_Client"
		/>

		<FlatList
		 data={props.mealPlans}
		 renderItem={({item}) => <MealPlan id={item.id} 
		 				   title={item.title}
						   recipes={item.meal}
		 				   open={open} 
						   setVisible={setVisible} 
						   navigation={props.navigation} 
						   setModalVisible={setModalVisible} 
						   setSelectedFoodItem={loadSelectedFoodItemDetails} />}
		 style={styles}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		 horizontal={props.horizontal ? props.horizontal : false}
		/>
		</>
	)
}

export default connect(mapStateToProps)(TrainerMealsSection);

