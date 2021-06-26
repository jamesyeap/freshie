import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { SmallButton, TextButton } from '../_atoms/Button';
import { ButtonGroup } from '../_molecules/ButtonGroup';
import { TextInput } from './TextInput';

/* WORK IN PROGRESS */
/* VARIATIONS TO MAKE
	-> Meal Plan (client)
	-> Custom (client)
	-> Favorites (client)

	-> Meal Plan (trainer)
	-> Meals (trainer)
*/

export const TextInputModal = (props) => {
	const handleButtonPress = (func) => {
		props.setModalVisible(!props.modalVisible);
		func();
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
					<TextInput 
					 containerStyle={{ justifyContent: "center", alignItems: "center" }} 
					 inputStyle={{ width: 250 }} 
					 onChangeText={props.onChangeText}
					 value={props.value}
					 label={props.label ? props.label : null}
					 />
				<ButtonGroup containerStyle={{ width: 200 }} >
					<SmallButton buttonStyle={{ width: 70 }} label="Assign" onPress={() => handleButtonPress(props.onPress)}/>
					<TextButton label="Close" onPress={() => handleButtonPress(() => props.setModalVisible(false))} />
				</ButtonGroup>
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