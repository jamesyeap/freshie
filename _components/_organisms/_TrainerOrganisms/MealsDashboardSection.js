import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import { FoodItem } from '../../_molecules/FoodItem';

// mock example
const data = [
	{
		id: 0,
		title: "Egg Sandwich",
		calories: 500,
		instructions: "Just make lah bro.",
		ingredients: "Egg. Bread. What more do you want sia."
	}
]

export const MealsDashboardSection = (props) => {
	return (
		<FlatList
		 data={data}
		 renderItem={({ item }) => <FoodItem navigation={props.navigation} itemDetails={item} />}
		 keyExtractor={(item) => item.id}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		/>
	)
}