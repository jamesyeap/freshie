import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import { FoodItem } from '../_molecules/FoodItem';
import { connect } from 'react-redux';
import { ButtonModal } from '../_molecules/ButtonModal';
import { deleteConsumedMeal_API } from '../../_utilities/_api/User';

// mock example
const data = [
	{
		id: 0,
		title: "Egg Sandwich",
		calories: 500,
		instructions: "Just make lah bro.",
		ingredients: "Egg. Bread. What more do you want sia."
	}
]

function mapStateToProps(state) {
	const { consumedMeals } = state.user;
	return { consumedMeals };
}

const EatenMealsSection = (props) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedFoodItem, setSelectedFoodItem] = useState(null);
	const [selectedFoodItemDetails, setSelectedFoodItemDetails] = useState(null);

	/* ********** Functions for the ButtonModal pop-up ********** */ 
	const handleEdit = () => {
		// redirects the user to the "EditRecipe" page that is pre-filled with all the item's info
		props.navigation.push("EditRecipe", { itemDetails: selectedFoodItemDetails[0] });
	}

	const handleDelete = () => {
		deleteConsumedMeal_API(selectedFoodItem);
		props.navigation.navigate("Home");
	}

	const loadSelectedFoodItemDetails = (id) => {
		setSelectedFoodItem(id);
		const itemDetails = props.consumedMeals.filter(foodItem => foodItem.id === id);
		setSelectedFoodItemDetails(itemDetails);
	}
	/* ************************************************************ */	

	return (
		<>
		<ButtonModal 
		 modalVisible={modalVisible} 
		 setModalVisible={setModalVisible} 
		 handleEdit={handleEdit}
		 handleDelete={handleDelete}
		/>

		<FlatList
		 data={props.consumedMeals}
		 renderItem={({ item }) => <FoodItem navigation={props.navigation} 
		 				     itemDetails={item} 
						     setModalVisible={setModalVisible} 
						     setSelectedFoodItem={loadSelectedFoodItemDetails} />}
		 keyExtractor={(item) => item.id}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		/>

		</>
	)
}

export default connect(mapStateToProps)(EatenMealsSection);