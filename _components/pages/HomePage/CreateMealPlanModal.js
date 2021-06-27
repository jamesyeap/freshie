import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { SmallButton, TextButton } from '../../_atoms/Button';
import { RegularText } from '../../_atoms/Text';
import { ButtonGroup } from '../../_molecules/ButtonGroup';
import { TextInput } from '../../_molecules/TextInput';

export const CreateMealPlanModal = (props) => {
	const handleButtonPress = (func) => {
		props.handleClose();
		func();
	}

	return (
		<Modal
		animationType="slide"
		transparent={true}
		visible={props.modalVisible}
		onRequestClose={() => {
			props.handleClose();
		}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<RegularText>Create New Meal Plan</RegularText>
					<TextInput 
					 containerStyle={{ justifyContent: "center", alignItems: "center" }} 
					 inputStyle={{ width: 250 }} 
					 onChangeText={props.onChangeText}
					 value={props.value}
					 label={props.label ? props.label : null}
					 />
				<ButtonGroup containerStyle={{ width: 200 }} >
					<SmallButton buttonStyle={{ width: 70 }} label="Assign" onPress={() => handleButtonPress(props.onPress)}/>
					<TextButton label="Close" onPress={() => handleButtonPress(() => props.handleClose())} />
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