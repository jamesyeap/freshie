import React, { useState, useReducer } from 'react';
import { FlatList, Modal } from 'react-native';
import { BigButton } from '../../_atoms/Button';
import styled from 'styled-components';
import { FoodItem } from '../../_molecules/FoodItem';
import { ButtonModal } from '../../_molecules/ButtonModal';
import { deleteRecipe_API } from '../../../_utilities/_api/Recipe'
import { connect } from 'react-redux';

const selectedFoodItemActions = {
	SET_SELECTED_ITEM: "SET_SELECTED_ITEM",
	SET_MODAL_VISIBLE: "SET_MODAL_VISIBLE"
}

function selectedFoodItemReducer(state, action) {
	switch(action.type) {
		case selectedFoodItemActions.SET_SELECTED_ITEM: 
			return {...state, foodItem: action.payload}
		case selectedFoodItemActions.SET_MODAL_VISIBLE:
			return {...state, showModal: action.payload}
	}
}

function mapStateToProps(state) {
	const { recipes } = state.recipe;
	return { recipes };
}

export function MealsDashboardSection (props) {
	const [selectedFoodItem, dispatch] = useReducer(selectedFoodItemReducer, {
		foodItem: null,
		showModal: false
	});

	/* ********** Functions for the ButtonModal pop-up ********** */ 
	const handleSelectFoodItem = (foodItem) => {
		dispatch({ type: selectedFoodItemAction.SET_SELECTED_ITEM, 
			   payload: foodItem
		})

		dispatch({ type: selectedFoodItemActions.SET_SHOW_MODAL,
			   payload: true
		})
	}

	const handleEdit = () => {
		alert(selectedFoodItem.foodItem);
		props.navigation.push("EditRecipe", { type: "edit", itemDetail: selectedFoodItem.foodItem });
	}

	const handleDelete = () => {
		deleteRecipe_API()
	}

	/* ************************************************************ */

	/* Remove recipes without an author (that were duplicated on the backend for immutability and associated fancy concepts hehehoho) */

	return (
		<>
		 <ButtonModal 
		 modalVisible={selectedFoodItem.showModal} 
		 setModalVisible={(boolean) => dispatch({ type: selectedFoodItemActions.SET_MODAL_VISIBLE, payload: boolean })} 
		 handleEdit={handleEdit}
		 handleDelete={handleDelete}
		 variation="Meals_Trainer"
	        />

		<FlatList
		 data={props.recipes}
		 renderItem={({ item }) => <FoodItem navigation={props.navigation} 
		 				     itemDetails={item} 
						     setModalVisible={(boolean) => dispatch({ type: selectedFoodItemActions.SET_MODAL_VISIBLE, payload: boolean })} 
						     setSelectedFoodItem={handleSelectFoodItem}
					   />}
		 keyExtractor={(item) => item.id.toString()}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		/>
		</>
	)
}

export default connect(mapStateToProps)(MealsDashboardSection);

