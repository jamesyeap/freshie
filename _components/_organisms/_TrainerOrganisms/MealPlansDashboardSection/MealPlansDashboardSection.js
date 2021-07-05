import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { MealPlan } from '../../../_molecules/MealPlan';
import { connect, useDispatch } from 'react-redux';
import { MealButtonModal } from './MealButtonModal';
import { addRecipeToMealPlan_API } from '../../../../_redux/actions/Trainer.actions';
import { getRecipeList_API, getMealPlans_API, deleteMealPlan_API } from '../../../../_redux/actions/Recipes.actions';
import { MealPlanButtonModal } from './MealPlanButtonModal';

function mapStateToProps(state) {
	const { mealPlans, recipes } = state.recipe;
	return { mealPlans, recipes };
}

export const MealPlansDashboardSection = (props) => {
	const [selectedMealPlan, setSelectedMealPlan] = useState(null);
	const [selectedFoodItem, setSelectedFoodItem] = useState(null);
	const [mealModalVisible, setMealModalVisible] = useState(false);
	const [mealPlanModalVisible, setMealPlanModalVisible] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	const dispatch = useDispatch();

	const handleSelectFoodItem = (foodItemDetails) => {
		console.log(foodItemDetails)
		setSelectedFoodItem(foodItemDetails);
		setMealModalVisible(true);
	}

	const handleCloseMealModal = () => {
		setSelectedFoodItem(null);
		setMealModalVisible(false);
	}

	/* View the details of the food item inside the meal plan template */
	const handleViewFoodItem = () => {
		props.navigation.push("Recipe", { itemDetails: selectedFoodItem })
	}

	/* Edit food item inside the meal plan template */
	const handleEditFoodItem = () => {
		// the details of the selected food item is given to the editPage to prefill the fields in the page
		props.navigation.push("EditRecipe", { itemDetails: selectedFoodItem }) 
	}

	/* Delete the food item inside the meal plan template */
	const handleDeleteFoodItem = () => {
		let currRecipes = [];

		if (selectedMealPlan.recipes.length > 1) {
			selectedMealPlan.recipes.forEach(x => currRecipes.push(x.id));
			const removeFoodItemID = selectedFoodItem.id;
			currRecipes = currRecipes.filter(x => x !== removeFoodItemID)
		}

		dispatch(addRecipeToMealPlan_API({ mealPlanID: selectedMealPlan.id, 
					  mealPlanTitle: selectedMealPlan.title,
					  recipeIDList: currRecipes
		}))

		setSelectedFoodItem(null);
		setSelectedMealPlan(null);
		setMealModalVisible(false);
	}

	const handleExpandMealPlan = (mealPlanDetails) => {
		if (!selectedMealPlan) {
			setSelectedMealPlan(mealPlanDetails);
		} else {
			setSelectedMealPlan(null);
		}
	}

	const handleSelectMealPlan = (mealPlanDetails) => {
		console.log(mealPlanDetails)
		setSelectedMealPlan(mealPlanDetails)
		setMealPlanModalVisible(true)
	}

	/* Add a food item to the meal plan template */
	const handleAddFoodItem = async () => {
		dispatch(getRecipeList_API("search"));
		props.navigation.push("Search", { mealPlan: selectedMealPlan, variation: "ChooseRecipe" })
	}

	const handleAssignToClient = (mealPlan) => {
		props.navigation.push("Search", { mealPlan: selectedMealPlan, variation: "ChooseClient" })
	}

	const handleDeleteMealPlan = () => {
		dispatch(deleteMealPlan_API(selectedMealPlan.id));
	}

	const handleCloseMealPlanModal = () => {
		setSelectedMealPlan(null);
		setMealPlanModalVisible(false);
	}

	const handleRefresh = () => {
		setRefreshing(true);
		dispatch(getMealPlans_API());
		setRefreshing(false);
	}

	return (
		<>
		{/* Displays a popup with a list of buttons to interact with the foodItem */}

		<MealButtonModal
		modalVisible={mealModalVisible}
		itemDetails={selectedFoodItem}

		handleClose={handleCloseMealModal}
		handleView={handleViewFoodItem}
		handleEdit={handleEditFoodItem}
		handleDelete={handleDeleteFoodItem}
		/>

		<MealPlanButtonModal
		modalVisible={mealPlanModalVisible}
		itemDetails={selectedMealPlan}

		handleClose={handleCloseMealPlanModal}
		handleDelete={handleDeleteMealPlan}
		handleAddFoodItem={handleAddFoodItem}
		handleAssignToClient={handleAssignToClient}
		/>
		
		

		<FlatList
		 data={props.mealPlans}
		 renderItem={({item}) => <MealPlan id={item.id} 
		 				   key={item.id.toString()}
		 				   title={item.title}
						   recipes={item.meal}
		 				   open={selectedMealPlan !== null && item.id === selectedMealPlan.id && !mealPlanModalVisible} 
						   handleExpandMealPlan={handleExpandMealPlan} 
						   handleSelectMealPlan={handleSelectMealPlan}
						   navigation={props.navigation} 
						   setSelectedFoodItem={handleSelectFoodItem} 
						   />}
		 keyExtractor = { (item, index) => index.toString() }
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }} 
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		 onRefresh={handleRefresh}
		 refreshing={refreshing}
		/>
		</>
	)
}

export default connect(mapStateToProps)(MealPlansDashboardSection);

