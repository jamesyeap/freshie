import React from 'react';
import styled from 'styled-components';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { SmallButton, TextButton } from '../../../_atoms/Button';
import { RegularText, HeaderMediumText, SubHeaderText } from '../../../_atoms/Text';

const TextContainer = styled.View`
	flexDirection: column;
	alignSelf: flex-start;
	marginBottom: 20;
`;

const ActionsContainer = styled.View`
	flexDirection: row;
	alignSelf: center;
	justifyContent: center;
	marginBottom: 20;
`;

export const ClientsButtonModal = (props) => {
	const handleButtonPress = (func) => {
		// closes the modal after a button has been pressed!
		func();
		props.handleClose();
	}

	const { first_name, last_name, username, email } = props.itemDetails.user;

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
					<TextContainer>
						<HeaderMediumText>{first_name + " " + last_name}</HeaderMediumText>
						<SubHeaderText>{username}</SubHeaderText>
					</TextContainer>

					<ActionsContainer>
						<SmallButton label="View" onPress={() => handleButtonPress(props.handleView)} buttonStyle={{ width: 100, marginRight: 5 }}/>
						<SmallButton label="Delete" onPress={() => handleButtonPress(props.handleDelete)} buttonStyle={{ width: 100, backgroundColor: "red" }} />
					</ActionsContainer>
					<TextButton label="Close" onPress={props.handleClose} />
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