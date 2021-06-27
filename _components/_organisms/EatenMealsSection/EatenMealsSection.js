import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import { FoodItem } from '../../_molecules/FoodItem';
import { connect } from 'react-redux';
import { ButtonModal } from '../../_molecules/ButtonModal';
import { EatenMealsButtonModal } from './EatenMealsButtonModal';
import { deleteConsumedMeal_API } from '../../../_utilities/_api/User';

function mapStateToProps(state) {
	const { consumedMeals } = state.user;
	return { consumedMeals };
}

const EatenMealsSection = (props) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedFoodItem, setSelectedFoodItem] = useState(null);

	/* ********** Functions for the ButtonModal pop-up ********** */ 
	const handleEdit = () => {
		// redirects the user to the "EditRecipe" page that is pre-filled with all the item's info
		props.navigation.push("EditRecipe", { itemDetails: selectedFoodItem });
	}

	const handleDelete = () => {
		deleteConsumedMeal_API(selectedFoodItem.id);
		props.navigation.navigate("Home");
	}

	const handleSelectFoodItem = (foodItem) => {
		setSelectedFoodItem(foodItem);
		setModalVisible(true);
	}
	/* ************************************************************ */	

	return (
		<>
		<EatenMealsButtonModal
		modalVisible={modalVisible} 
		handleEdit={handleEdit}
		handleDelete={handleDelete}
		handleClose={() => setModalVisible(false)}
		itemDetails={selectedFoodItem}
		/>

		<FlatList
		 data={props.consumedMeals}
		 renderItem={({ item }) => <FoodItem navigation={props.navigation} 
		 				     itemDetails={item} 
						     setModalVisible={setModalVisible} 
						     setSelectedFoodItem={handleSelectFoodItem} />}
		 keyExtractor={(item) => item.id.toString()}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		/>

		</>
	)
}

export default connect(mapStateToProps)(EatenMealsSection);