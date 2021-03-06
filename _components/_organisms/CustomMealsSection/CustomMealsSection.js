import React, { useState } from 'react';
import { FlatList, Animated, View, Dimensions, StyleSheet } from 'react-native';
import { FoodItem } from '../../_molecules/FoodItem';
import { BrandHeaderText } from '../../_atoms/Text';
import { IconButton } from '../../_atoms/Button';
import { addConsumedMeal_API, addFavouriteMeal_API } from '../../../_redux/actions/Client.actions';
import { getRecipeList_API, deleteRecipe_API } from '../../../_redux/actions/Recipes.actions';
import { useSelector, useDispatch } from 'react-redux';
import { determineMealType } from '../../../_utilities/_helperFunctions/determineMealType';
import { CustomMealsButtonModal } from './CustomMealsButtonModal';

const { height, width } = Dimensions.get('window')

export function Header({ scrolling, navigation }) {
	const translation = scrolling.interpolate({
		inputRange: [0, width , 2 * width],
		outputRange: [-130, 0, -130],
		extrapolate: 'clamp',
	  })

	 const opacity = scrolling.interpolate({
		inputRange: [0, width , 2 * width],
		outputRange: [0, 1, 0],
		extrapolate: 'clamp',
	 })

	return (
		<>
		<Animated.View
			style={{
				...styles.header,
				transform: [
					{ translateY: translation }
				]
			}}
			opacity={opacity}
		>	
			<View style={styles.headerTextContainer}>
				<IconButton
				iconName="arrow-back"
				iconSize={25}
				iconColor="black"
				buttonStyle={{ marginLeft: 30 }}
				onPress={() => navigation.navigate("Home")}
				/>
				<BrandHeaderText style={styles.headerText}>Meals</BrandHeaderText>
			</View>
		</Animated.View>
	</>
	)
}

export default function CustomMealsSection(props) {
	const [selectedFoodItem, setSelectedFoodItem] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const { recipes } = useSelector(state => state.recipe)

	const dispatch = useDispatch()

	/* ********** Functions for the ButtonModal pop-up ********** */ 
	const handleSelectFoodItem = (foodItem) => {
		setSelectedFoodItem(foodItem);
		setModalVisible(true);
	}

	const handleConsume = () => {
		const obj = { title: selectedFoodItem.title, calories: selectedFoodItem.calories, mealType: determineMealType() }
		dispatch(addConsumedMeal_API(obj));
		
		props.navigation.navigate("Home");
	}

	const handleEdit = () => {
		// redirects the user to the "EditRecipe" page that is pre-filled with all the item's info
		props.navigation.push("EditRecipe", { itemDetails: selectedFoodItem, type: "edit" });
	}

	const handleDelete = () => {
		dispatch(deleteRecipe_API(selectedFoodItem.id));
	}

	const handleFavourite = () => {
		dispatch(addFavouriteMeal_API(selectedFoodItem.id))
	}

	const handleView = () => {
		props.navigation.push("Recipe", { itemDetails: selectedFoodItem, navigation: props.navigation })
	}
	/* ************************************************************ */
	
	const handleRefresh = () => {
		setRefreshing(true);
		dispatch(getRecipeList_API("custom"));
		setRefreshing(false);
	}

	return (
		<>	
		<CustomMealsButtonModal
		modalVisible={modalVisible}
		handleClose={() => setModalVisible(false)}
		handleConsume={handleConsume}
		handleView={handleView}
		handleEdit={handleEdit}
		handleDelete={handleDelete}	
		handleFavourite={handleFavourite}
		itemDetails={selectedFoodItem}
		/>

		<FlatList
		 data={recipes}
		 renderItem={({ item }) => <FoodItem navigation={props.navigation} 
		 				     key={item.id.toString()}
		 				     itemDetails={item} 
						     setModalVisible={setModalVisible} 
						     setSelectedFoodItem={handleSelectFoodItem} 
					   />}
		 keyExtractor = { (item, index) => index.toString() }
		 style={{ alignSelf: 'center', backgroundColor: "#FFFBEB", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		 onRefresh={handleRefresh}
		 refreshing={refreshing}
		/>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		backgroundColor: "#FFFBEB",
		height: height,
		width: width,
	},
	header: {
		position: 'absolute',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		top: 40,
		left: 0,
		right: 0,
		height: 100,
		paddingTop: 20,
		paddingBottom: 20,
		zIndex: 1000,
	}, 
	headerText: {
		fontSize: 28,
		paddingLeft: 10
	},
	headerTextContainer: {
		flexDirection: "row",
		paddingLeft: 5,
		alignItems: "center",
	}
})