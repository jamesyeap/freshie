import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { FoodItem } from '../../_molecules/FoodItem';
import { connect, useDispatch } from 'react-redux';
import { EatenMealsButtonModal } from './EatenMealsButtonModal';
import EmptyComponent from './EmptyComponent';
import { deleteConsumedMeal_API } from '../../../_redux/actions/Client.actions';

function mapStateToProps(state) {
	const { consumedMeals } = state.client;
	return { consumedMeals };
}

const EatenMealsSection = (props) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedFoodItem, setSelectedFoodItem] = useState(null);
	const dispatch = useDispatch();

	/* ********** Functions for the ButtonModal pop-up ********** */ 
	const handleView = () => {
		props.navigation.push("Recipe", { itemDetails: selectedFoodItem, navigation: props.navigation })
	};
	
	const handleDelete = () => {
		dispatch(deleteConsumedMeal_API(selectedFoodItem.id))
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
		handleView={handleView}
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
		 ListEmptyComponent={<EmptyComponent />}
		/>

		</>
	)
}

export default connect(mapStateToProps)(EatenMealsSection);