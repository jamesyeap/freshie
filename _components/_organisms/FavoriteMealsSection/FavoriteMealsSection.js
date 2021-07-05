import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { FoodItem } from '../../_molecules/FoodItem';
import { FavoritesButtonModal } from './FavoriteMealsButtonModal';
import { addConsumedMeal_API, getFavouriteMeals_API } from '../../../_redux/actions/Client.actions';
import { deleteRecipe_API } from '../../../_redux/actions/Recipes.actions'
import { connect, useDispatch } from 'react-redux';
import { determineMealType } from '../../../_utilities/_helperFunctions/determineMealType';

function mapStateToProps(state) {
	const { favouriteMeals } = state.user;
	return { favouriteMeals };
}

export const FavoriteMealsSection = (props) => {
	const [selectedFoodItem, setSelectedFoodItem] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	
	const dispatch = useDispatch()

	/* ********** Functions for the ButtonModal pop-up ********** */ 
	const handleSelectFoodItem = (foodItem) => {
		setSelectedFoodItem(foodItem);
		setModalVisible(true);
	}

	const handleConsume = () => {
		console.log(selectedFoodItem);
		const obj = { recipeID: selectedFoodItem.id, mealType: determineMealType() }
		dispatch(addConsumedMeal_API(obj));
		props.navigation.navigate("Home");
	}

	const handleEdit = () => {
		// redirects the user to the "EditRecipe" page that is pre-filled with all the item's info
		props.navigation.push("EditRecipe", { itemDetails: selectedFoodItem });
	}

	const handleDelete = () => {
		dispatch(deleteRecipe_API(selectedFoodItem.id));
		props.navigation.navigate("Home");
	}

	/* ************************************************************ */

	const handleRefresh = () => {
		setRefreshing(true);
		dispatch(getFavouriteMeals_API());
		setRefreshing(false);
	}

	return (
		<>
		<FavoritesButtonModal
		modalVisible={modalVisible}
		handleClose={() => setModalVisible(false)}
		handleConsume={handleConsume}
		handleEdit={handleEdit}
		handleDelete={handleDelete}	
		itemDetails={selectedFoodItem}
		/>

		<FlatList
		 data={props.favouriteMeals}
		 renderItem={({ item }) => <FoodItem navigation={props.navigation} 
		 				     id={item.id}
		 				     itemDetails={item} 
						     setModalVisible={setModalVisible} 
						     setSelectedFoodItem={handleSelectFoodItem} 
						     key={item.id.toString()}
					   />}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		 keyExtractor = {(item) => item.id.toString()}
		 onRefresh={handleRefresh}
		 refreshing={refreshing}
		/>
		</>
	)
}

export default connect(mapStateToProps)(FavoriteMealsSection);