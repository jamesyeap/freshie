import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';

import { Container } from '../../../_atoms/Container';
import { FoodItem } from '../../../_molecules/FoodItem';
import { ButtonModal } from '../../../_molecules/ButtonModal';
import { HeaderMediumText } from '../../../_atoms/Text';
import { MediumButton } from '../../../_atoms/Button';
import { deleteClientMealPlan_API } from '../../../../_redux/actions/Trainer.actions';

export default function MealPlanPage(props) {
	const { id, title, meal } = props.route.params.mealPlanDetails;
	const [selectedFoodItem, setSelectedFoodItem] = useState(null);
	const [selectedFoodItemDetails, setSelectedFoodItemDetails] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const clientUsername = props.route.params.clientDetails.username;

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
		dispatch(deleteRecipe_API(selectedFoodItem));
		props.navigation.navigate("Home");
	}

	const loadSelectedFoodItemDetails = (id) => {
		setSelectedFoodItem(id);
		const itemDetails = meal.filter(foodItem => foodItem.id === id);
		setSelectedFoodItemDetails(itemDetails);
	}

	const handleUnassignMealPlan = () => {
		const values = { mealPlanID: id, clientUsername: clientUsername }
		console.log(values);
		deleteClientMealPlan_API(values);

		props.navigation.push("Dashboard");
	}
	/* ************************************************************ */

	return (
		<Container>

		<ButtonModal 
		 modalVisible={modalVisible} 
		 setModalVisible={setModalVisible} 
		 handleConsume={handleConsume}
		 handleEdit={handleEdit}
		 handleDelete={handleDelete}
		 variation="Custom_Client"
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