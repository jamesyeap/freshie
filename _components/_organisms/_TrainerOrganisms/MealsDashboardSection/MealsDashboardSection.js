import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { FoodItem } from '../../../_molecules/FoodItem';
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
		props.navigation.push("EditRecipe", { itemDetails: selectedFoodItem });
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
		 data={props.recipes}
		 renderItem={({ item }) => <FoodItem navigation={props.navigation} 
		 				     itemDetails={item} 
						     setModalVisible={() => setShowModal(true)} 
						     setSelectedFoodItem={handleSelectFoodItem}
						     key={item.id.toString()}
					   />}
		 keyExtractor={(item) => item.id.toString()}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		 onRefresh={handleRefresh}
		 refreshing={refreshing}
		/>
		</>
	)
}

export default connect(mapStateToProps)(MealsDashboardSection);

