import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import { MealPlan } from '../_molecules/MealPlan';
import { FoodItem } from '../_molecules/FoodItem';

// mock example
const data = [0, 1, 2]

export const TrainerMealsSection = (props) => {
	return (
		<FlatList
		 data={data}
		 renderItem={MealPlan}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		/>
	)
}

