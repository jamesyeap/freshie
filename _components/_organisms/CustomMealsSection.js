import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import { FoodItem } from '../_molecules/FoodItem';
import { ButtonModal } from '../_molecules/ButtonModal';
import { addConsumedMeal_API } from '../../_utilities/_api/User';
import { deleteRecipe_API } from '../../_utilities/_api/Recipe'
import { connect } from 'react-redux';
import { determineMealType } from '../../_utilities/_helperFunctions/determineMealType';

/* mock example
const data = [
	{
		id: 0,
		title: "Egg Sandwich",
		calories: 500,
		instructions: "Just make lah bro.",
		ingredients: "Egg. Bread. What more do you want sia."
	}
]
*/

function mapStateToProps(state) {
	const { recipes } = state.recipe;
	return { recipes };
}

export const CustomMealsSection = (props) => {
	const [selectedFoodItem, setSelectedFoodItem] = useState(null);
	const [selectedFoodItemDetails, setSelectedFoodItemDetails] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	/* ********** Functions for the ButtonModal pop-up ********** */ 
	const handleConsume = () => {
		console.log(selectedFoodItem);

		const obj = { recipeID: Number(selectedFoodItem), mealType: determineMealType() }
		addConsumedMeal_API(obj);
		
		props.navigation.navigate("Home");
	}

	const handleEdit = () => {
		// redirects the user to the "EditRecipe" page that is pre-filled with all the item's info
		props.navigation.push("EditRecipe", { itemDetails: selectedFoodItemDetails[0], type: "edit" });
	}

	const handleDelete = () => {
		deleteRecipe_API(selectedFoodItem);
		props.navigation.navigate("Home");
	}

	const loadSelectedFoodItemDetails = (id) => {
		setSelectedFoodItem(id);
		const itemDetails = props.recipes.filter(foodItem => foodItem.id === id);
		setSelectedFoodItemDetails(itemDetails);
	}
	/* ************************************************************ */

	console.log(selectedFoodItem);
	
	return (
		<>
		<ButtonModal 
		 modalVisible={modalVisible} 
		 setModalVisible={setModalVisible} 
		 handleConsume={handleConsume}
		 handleEdit={handleEdit}
		 handleDelete={handleDelete}
		 variation="Custom_Client"
		/>

		<FlatList
		 data={props.recipes}
		 renderItem={({ item }) => <FoodItem navigation={props.navigation} 
		 				     itemDetails={item} 
						     setModalVisible={setModalVisible} 
						     setSelectedFoodItem={loadSelectedFoodItemDetails} 
					   />}
		 keyExtractor={(item) => item.id.toString()}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		/>
		</>
	)
}

export default connect(mapStateToProps)(CustomMealsSection);