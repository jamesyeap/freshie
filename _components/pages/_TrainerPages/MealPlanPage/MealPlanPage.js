import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';

import { Container } from '../../../_atoms/Container';
import { FoodItem } from '../../../_molecules/FoodItem';
import { ButtonModal } from '../../../_molecules/ButtonModal';
import { HeaderMediumText } from '../../../_atoms/Text';
import { MediumButton } from '../../../_atoms/Button';
import { deleteClientMealPlan_API } from '../../../../_redux/actions/Trainer.actions';
import { deleteRecipe_API } from '../../../../_redux/actions/Recipes.actions';

export default function MealPlanPage(props) {
	const { id, title, meal } = props.route.params.mealPlanDetails;
	const [selectedFoodItem, setSelectedFoodItem] = useState(null);
	const [selectedFoodItemDetails, setSelectedFoodItemDetails] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const dispatch = useDispatch()

	const clientUsername = props.route.params.clientDetails.username;

	/* ********** Functions for the ButtonModal pop-up ********** */ 
	const handleView = () => {
		props.navigation.push("Recipe", { itemDetails: selectedFoodItem })
	}

	const handleEdit = () => {
		// redirects the user to the "EditRecipe" page that is pre-filled with all the item's info
		props.navigation.push("EditRecipe", { itemDetails: selectedFoodItem, type: "edit" });
	}

	const handleDelete = () => {
		dispatch(deleteRecipe_API(selectedFoodItem.id));
	}

	const loadSelectedFoodItemDetails = (id) => {
		setSelectedFoodItem(id);
		setModalVisible(true)
		const itemDetails = meal.filter(foodItem => foodItem.id === id);
		setSelectedFoodItemDetails(itemDetails);
	}

	const handleUnassignMealPlan = () => {
		const values = { mealPlanID: id, clientUsername: clientUsername }
		dispatch(deleteClientMealPlan_API(values));

		props.navigation.goBack();
	}
	/* ************************************************************ */

	return (
		<Container>

		<ButtonModal 
		 modalVisible={modalVisible} 
		 setModalVisible={setModalVisible} 
		 handleViewFoodItem={handleView}
		 handleEditFoodItem={handleEdit}
		 handleDeleteFoodItem={handleDelete}
		 variation='MealPlan_Trainer'
		/>
		
		<HeaderMediumText style={{ textAlign: "left" }}>{title}</HeaderMediumText>

		<FlatList
		data={meal}
		renderItem={({ item }) => <FoodItem 
						key={item.id.toString()}
						navigation={props.navigation} 
						itemDetails={item} 
						setModalVisible={setModalVisible} 
						setSelectedFoodItem={loadSelectedFoodItemDetails} 
					/>}
		keyExtractor={(item) => item.id.toString()}
		style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		/>

		<MediumButton label="Unassign Meal Plan" buttonStyle={{ marginTop: 20 }} onPress={() => handleUnassignMealPlan()} />

		</Container>
	)
}