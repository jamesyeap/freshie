import { rgb } from 'babel-jest/node_modules/chalk';
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import { FAB as ParentFAB, Portal, Provider } from 'react-native-paper';
import { SpeedDial } from 'react-native-elements';

const { height, width } = Dimensions.get('window')

export default function FAB({ navigation }) {
	const [open, setOpen] = useState(false);
  
	const fabContainerStyle = {
		position: 'fixed',
		bottom: 20,
		right: 20,
	}

	return (
		<ParentFAB.Group
			style={fabContainerStyle}
			fabStyle={{ backgroundColor: "#D1FAE5" }}
			open={open}
			icon={open ? 'minus' : 'menu'}
			actions={[
			{
				icon: 'book',
				label: 'Add Meal Plan',
				onPress: () => alert("2"),
				small: false,
			},
			{
				icon: 'arrow-left',
				label: 'Go home',
				onPress: () => navigation.goBack(),
				small: false,
			},
			]}

			onStateChange={() => setOpen(!open)}

			onPress={() => {
			if (open) {
				// do something if the speed dial is open
			}
			}}
		/>
		
		
		
	)
} 

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 10,
		right: 10
	},
})



      