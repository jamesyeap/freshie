import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { SmallButton, TextButton } from '../_atoms/Button';

export const ButtonModal = (props) => {
	const handleButtonPress = (func) => {
		// closes the modal after a button has been pressed!
		props.setModalVisible(false);
		func();
	}

	/* VARIATIONS */
	
	// Meal Plan (client)
	const MealPlanClientButtons = () => 
		<>
			<SmallButton label="Consume" buttonStyle={{ width: 200, marginTop: 10 }} onPress={() => handleButtonPress(props.handleConsume)} />
			<SmallButton label="Close" buttonStyle={{ width: 200, backgroundColor: "red", marginTop: 10 }} onPress={() => props.setModalVisible(!props.modalVisible)} />
		</> 

	// Custom (client)
	const CustomClientButtons = () => 
		<>
			<SmallButton label="Consume" buttonStyle={{ width: 200, marginTop: 10 }} onPress={() => handleButtonPress(props.handleConsume)} />
			<SmallButton label="Edit" buttonStyle={{ width: 200, marginTop: 10  }} onPress={() => handleButtonPress(props.handleEdit)} />
			<SmallButton label="Delete" buttonStyle={{ width: 200, marginTop: 10, backgroundColor: "red"  }} onPress={() => handleButtonPress(props.handleDelete)} />
			<TextButton label="Close" buttonStyle={{ width: 200, marginTop: 10 }} onPress={() => props.setModalVisible(!props.modalVisible)} />
		</>

	// Favorites (client)
	const FavoritesClientButtons = () => 
		<>
			<SmallButton label="Consume" buttonStyle={{ width: 200, marginTop: 10 }} onPress={() => handleButtonPress(props.handleConsume)} />
			<SmallButton label="Edit" buttonStyle={{ width: 200, marginTop: 10  }} onPress={() => handleButtonPress(props.handleEdit)} />
			<SmallButton label="Remove from Favorites" buttonStyle={{ width: 200, marginTop: 10, backgroundColor: "red"  }} onPress={() => handleButtonPress(props.handleEdit)} />
			<TextButton label="Close" buttonStyle={{ width: 200, marginTop: 10 }} onPress={() => props.setModalVisible(!props.modalVisible)} />
		</>

	// Eating History (client)
	const EatingHistoryClientButtons = () => 
		<>
			<SmallButton label="Edit" buttonStyle={{ width: 200, marginTop: 10  }} onPress={() => handleButtonPress(props.handleEdit)} />
			<SmallButton label="Remove" buttonStyle={{ width: 200, marginTop: 10, backgroundColor: "red"  }} onPress={() => handleButtonPress(props.handleDelete)} />
			<TextButton label="Close" buttonStyle={{ width: 200, marginTop: 10 }} onPress={() => props.setModalVisible(!props.modalVisible)} />
		</>

	// Meal Plan (trainer)
	const MealPlanTrainerButtons = () => 
		<>
			<SmallButton label="View" buttonStyle={{ width: 200, marginTop: 10  }} onPress={() => handleButtonPress(() => handleButtonPress(props.handleViewFoodItem))} />
			<SmallButton label="Edit" buttonStyle={{ width: 200, marginTop: 10  }} onPress={() => handleButtonPress(() => handleButtonPress(props.handleEditFoodItem))} />
			<SmallButton label="Remove from Meal Plan" buttonStyle={{ width: 200, marginTop: 10, backgroundColor: "red"  }} onPress={() => handleButtonPress(props.handleDeleteFoodItem)} />
			<TextButton label="Close" buttonStyle={{ width: 200, marginTop: 10 }} onPress={() => props.setModalVisible(false)} />
		</>

	// Meals (trainer)
	const MealsTrainerButtons = () => 
		<>
			<SmallButton label="Edit" buttonStyle={{ width: 200, marginTop: 10  }} onPress={() => handleButtonPress(props.handleEdit)} />
			<SmallButton label="Delete" buttonStyle={{ width: 200, marginTop: 10, backgroundColor: "red"  }} onPress={() => handleButtonPress(props.handleDelete)} />
			<TextButton label="Close" buttonStyle={{ width: 200, marginTop: 10 }} onPress={() => props.setModalVisible(false)} />
		</>

	/* Determines which set of button groups to render based on the variation argument given by "props.variation" */
	const chooseOptions = () => {
		switch (props.variation) {
			case 'MealPlan_Client':
				return MealPlanClientButtons();
			case 'Custom_Client':
				return CustomClientButtons();
			case 'Favorites_Client':
				return FavoritesClientButtons();
			case 'EatingHistory_Client':
				return EatingHistoryClientButtons();
			case 'MealPlan_Trainer':
				return MealPlanTrainerButtons();
			case 'Meals_Trainer':
				return MealsTrainerButtons();
			default:
				return MealPlanClientButtons();
		}
	}

	return (
		<Modal
		animationType="slide"
		transparent={true}
		visible={props.modalVisible}
		onRequestClose={() => {
		Alert.alert("Modal has been closed.");
		setModalVisible(!props.modalVisible);
		}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					{ chooseOptions() }
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	centeredView: {
	  flex: 1,
	  justifyContent: "flex-end",
	  alignItems: "center",
	  marginBottom: 22,
	},
	modalView: {
	  margin: 20,
	  width: "80%",
	  backgroundColor: "white",
	  borderRadius: 20,
	  padding: 35,
	  alignItems: "center",
	  shadowColor: "#000",
	  shadowOffset: {
	    width: 0,
	    height: 2
	  },
	  shadowOpacity: 0.25,
	  shadowRadius: 4,
	  elevation: 5
	},
      });