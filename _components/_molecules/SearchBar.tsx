import React from "react";
import { View, Text, TextInput as ParentTextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';

interface TextInputProps {
	value: string;
	onChangeText: Function;
	handleSubmit: Function; 
	selected?: boolean;
}

const { height, width } = Dimensions.get('window')

export default function SearchBar(props: TextInputProps) {
	return (
		<View style={{ ...styles.container }}>
			<View style={{...styles.textInputContainer}}>
				<ParentTextInput
					value={props.value}
					onChangeText={props.onChangeText}
					style={styles.textInput}
					autoCapitalize="none"
				/>
			</View>

			<TouchableOpacity 
				style={styles.buttonContainer}
				onPress={props.handleSubmit}
			>
				<Ionicons name="md-search-outline" size={24} color="#D1FAE5" />
			</TouchableOpacity>
			
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	textInputContainer: {
		borderWidth: 5,
		borderColor: '#A7F3D0',
		backgroundColor: '#A7F3D0',
		borderRadius: 5,
		width: 0.75 * width
	},
	textInput: {
		fontFamily: 'Inter_400Regular',	
		color: '#047857',
		fontSize: 18
	},
	buttonContainer: {
		marginLeft: 5,
		padding: 5,
		backgroundColor: "#047857",
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		fontFamily: 'Inter_500Medium',	
		fontSize: 14,
		color: '#ECFDF5'
	}
})