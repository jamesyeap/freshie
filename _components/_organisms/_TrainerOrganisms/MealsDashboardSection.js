import React, { useState } from 'react';
import { FlatList, Modal } from 'react-native';
import Portal from '@burstware/react-native-portal';
import { SmallButton } from '../../_atoms/Button';
import styled from 'styled-components';
import { FoodItem } from '../../_molecules/FoodItem';
import { ButtonModal } from '../../_molecules/ButtonModal';
import { TextInputModal } from '../../_molecules/TextInputModal';
import { deleteRecipe_API } from '../../../_utilities/_api/Recipe'
import { addRecipeToMealPlan_API } from '../../../_utilities/_api/Trainer';
import { connect } from 'react-redux';
import { MealPlan } from '../../_molecules/MealPlan';

function mapStateToProps(state) {
	const { recipes, mealPlans } = state.recipe;
	return { recipes, mealPlans };
}

export function MealsDashboardSection (props) {
	const [selectedFoodItem, setSelectedFoodItem] = useState(null);
	const [selectedFoodItemDetails, setSelectedFoodItemDetails] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const [clientUsernameTextModalVisible, setClientUsernameTextModalVisible] = useState(false);
	const [clientUsername, setClientUsername] = useState("");

	const [mealPlanTextModalVisible, setMealPlanTextModalVisible] = useState(false);
	const [mealPlanID, setMealPlanID] = useState("");

	const [searchModalVisible, setSearchModalVisible] = useState(false);

	/* ********** Functions for the ButtonModal pop-up ********** */ 
	const handleAddToMealPlan = () => {
		// adds the recipe to a meal-plan
		const values = {
			clientUsername: clientUsername,
			recipeID: selectedFoodItem,
			mealPlanID: mealPlanID,
		}

		addRecipeToMealPlan_API(values);
		alert(`Adding recipe ${selectedFoodItem} to meal plan ${mealPlanID} for client ${clientUsername}...`);
	}

	const handleShowMealPlanSelectionModal = () => {
		setClientUsernameTextModalVisible(false);
		setMealPlanTextModalVisible(true);
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

	return (
		<>
		 <ButtonModal 
		 modalVisible={modalVisible} 
		 setModalVisible={setModalVisible} 
		 handleEdit={handleEdit}
		 handleDelete={handleDelete}
		 setClientUsernameTextModalVisible={setClientUsernameTextModalVisible}
		 variation="Meals_Trainer"
	        />

		<TextInputModal
		modalVisible={clientUsernameTextModalVisible}
		setModalVisible={setClientUsernameTextModalVisible}
		onChangeText={setClientUsername}
		value={clientUsername}
		onPress={handleShowMealPlanSelectionModal}
		label="For which client?"
		/>

		<TextInputModal
		modalVisible={mealPlanTextModalVisible}
		setModalVisible={setMealPlanTextModalVisible}
		onChangeText={setMealPlanID}
		value={mealPlanID}
		onPress={handleAddToMealPlan}
		label="For which meal plan?"
		/>

		<MealPlansModal 
		visible={searchModalVisible}
		mealPlans={props.mealPlans}
		/>

		<FlatList
		 data={props.recipes}
		 renderItem={({ item }) => <FoodItem navigation={props.navigation} 
		 				     itemDetails={item} 
						     setModalVisible={setModalVisible} 
						     setSelectedFoodItem={loadSelectedFoodItemDetails}
					   />}
		 keyExtractor={(item) => item.id}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		/>
		</>
	)
}

export default connect(mapStateToProps)(MealsDashboardSection);

const ModalContainer = styled.SafeAreaView`
	flex: 1
`;

const MealPlansModal = (props) => {
	return (
		<Portal>
		<Modal
		animalType="slide"
		transparent={true}
		visible={props.visible}
		onRequestClose={() => {
			Alert.alert("Modal has been closed.");
			setModalVisible(!modalVisible);
		}}
		>
		<FlatList
		 data={props.mealPlans}
		 renderItem={({item}) => <MealPlan id={item.id} 
		 				   title={item.title}
						   recipes={item.meal}
		 				   open={open} 
						   setVisible={setVisible} 
						   navigation={props.navigation} 
						   setModalVisible={setButtonModalVisible} 
						   setSelectedFoodItem={loadSelectedFoodItemDetails} 
						   setTextModalVisible={setTextModalVisible}
						   variation="Trainer"
						   />}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		/>
		</Modal>
		</Portal>
	)
}
