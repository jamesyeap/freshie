import React, { useState, useReducer } from 'react';
import { FlatList, Modal } from 'react-native';
import { FoodItem } from '../../../_molecules/FoodItem';
import { ButtonModal } from '../../../_molecules/ButtonModal';
import { getRecipeList_API, deleteRecipe_API } from '../../../../_utilities/_api/Recipe'
import { connect } from 'react-redux';
import { MealsButtonModal } from './MealsButtonModal';

function mapStateToProps(state) {
	const { recipes } = state.recipe;
	return { recipes };
}

export function MealsDashboardSection (props) {
	const [selectedFoodItem, setSelectedFoodItem] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	/* ********** Functions for the ButtonModal pop-up ********** */ 
	const handleSelectFoodItem = (foodItem) => {
		setSelectedFoodItem(foodItem);
		setShowModal(true);
	}

	const handleView = () => {
		props.navigation.push("Recipe", { itemDetails: selectedFoodItem });
	}

	const handleEdit = () => {
		props.navigation.push("EditRecipe", { itemDetail: selectedFoodItem });
	}

	const handleDelete = () => {
		deleteRecipe_API(selectedFoodItem.id)
	}
	/* ************************************************************ */

	const handleRefresh = () => {
		setRefreshing(true);
		getRecipeList_API("search")
		setRefreshing(false);
	}
	/* Remove recipes without an author (that were duplicated on the backend for immutability and associated fancy concepts hehehoho) */
	const originalRecipes = props.recipes.filter(x => x.author !== null);

	return (
		<>
		<MealsButtonModal
		modalVisible={showModal}
		handleClose={() => {setShowModal(false)}}
		handleView={handleView}
		handleEdit={handleEdit}
		handleDelete={handleDelete}
		itemDetails={selectedFoodItem}
		/>

		<FlatList
		 data={originalRecipes}
		 renderItem={({ item }) => <FoodItem navigation={props.navigation} 
		 				     itemDetails={item} 
						     setModalVisible={() => setShowModal(true)} 
						     setSelectedFoodItem={handleSelectFoodItem}
					   />}
		 keyExtractor={(item) => item.id}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		 onRefresh={handleRefresh}
		 refreshing={refreshing}
		/>
		</>
	)
}

export default connect(mapStateToProps)(MealsDashboardSection);

