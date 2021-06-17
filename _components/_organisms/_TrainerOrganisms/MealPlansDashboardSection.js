import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import { MealPlan } from '../../_molecules/MealPlan';
import { FoodItem } from '../../_molecules/FoodItem';
// mock example
const data = [
	{
		id: 0,
		name: "Taco",
	},
	{
		id: 1,
		name: "Pizza"
	},
	{
		id: 2,
		name: "Bread"
	}

]

export const MealPlansDashboardSection = (props) => {
	const [open, setOpen] = useState(null);

	const setVisible = (id) => {
		if (id === open) {
			setOpen(null);
		} else {
			setOpen(id);
		}
	} 

	return (
		<FlatList
		 data={data}
		 renderItem={({item}) => <MealPlan id={item.id} open={open} setVisible={setVisible} />}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		/>
	)
}