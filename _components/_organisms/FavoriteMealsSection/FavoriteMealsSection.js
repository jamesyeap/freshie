import React, { useState } from 'react';
import { FlatList, Animated, View, Dimensions, StyleSheet } from 'react-native';
import { FoodItem } from '../../_molecules/FoodItem';
import { FavoritesButtonModal } from './FavoriteMealsButtonModal';
import { addConsumedMeal_API, getFavouriteMeals_API, deleteFavouriteMeal_API } from '../../../_redux/actions/Client.actions';
import { BrandHeaderText } from '../../_atoms/Text';
import { IconButton } from '../../_atoms/Button';
import { useSelector, useDispatch } from 'react-redux';
import { determineMealType } from '../../../_utilities/_helperFunctions/determineMealType';

const { height, width } = Dimensions.get('window')

export function Header({ scrolling, navigation }) {
	const translation = scrolling.interpolate({
		inputRange: [width, 2 * width , 3 * width],
		outputRange: [-130, 0, -130],
		extrapolate: 'clamp',
	  })

	 const opacity = scrolling.interpolate({
		inputRange: [width, 2 * width , 3 * width],
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
				<BrandHeaderText style={styles.headerText}>Your Favorites!</BrandHeaderText>
			</View>
		</Animated.View>
	</>
	)
}

export default function FavoriteMealsSection(props) {
	const [selectedFoodItem, setSelectedFoodItem] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const { favouriteMeals } = useSelector(state => state.client);
	
	const dispatch = useDispatch()

	/* ********** Functions for the ButtonModal pop-up ********** */ 
	const handleSelectFoodItem = (foodItem) => {
		setSelectedFoodItem(foodItem);
		setModalVisible(true);
	}

	const handleConsume = () => {
		console.log(selectedFoodItem);
		const obj = { title: selectedFoodItem.title, calories: selectedFoodItem.calories, mealType: determineMealType() }
		dispatch(addConsumedMeal_API(obj));
		props.navigation.navigate("Home");
	}

	const handleEdit = () => {
		// redirects the user to the "EditRecipe" page that is pre-filled with all the item's info
		props.navigation.push("EditRecipe", { itemDetails: selectedFoodItem });
	}

	const handleDelete = () => {
		dispatch(deleteFavouriteMeal_API(selectedFoodItem.favID));
	}

	const handleView = () => {
		props.navigation.push("Recipe", { itemDetails: selectedFoodItem, navigation: props.navigation })
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
		handleView={handleView}
		handleEdit={handleEdit}
		handleDelete={handleDelete}	
		itemDetails={selectedFoodItem}
		/>

		<FlatList
		 data={favouriteMeals}
		 renderItem={({ item }) => <FoodItem navigation={props.navigation} 
		 				     id={item.id}
		 				     itemDetails={{ ...item.meal, favID: item.id }} 
						     setModalVisible={setModalVisible} 
						     setSelectedFoodItem={handleSelectFoodItem} 
						     key={item.id.toString()}
					   />}
		 style={styles.container}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		 keyExtractor = {(item) => item.id.toString()}
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
