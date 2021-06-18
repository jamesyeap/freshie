import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import { ClientMealPlan } from '../../_molecules/ClientMealPlan'

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

export const MealPlansSection = (props) => {
	const styles = props.style ? props.style : { backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }

	return (
		<FlatList
		 data={data}
		 renderItem={({item}) => <ClientMealPlan id={item.id} />}
		 style={styles}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		 horizontal={props.horizontal ? props.horizontal : false}
		/>
	)
}