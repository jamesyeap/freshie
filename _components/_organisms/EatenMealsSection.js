import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import { FoodItem } from '../_molecules/FoodItem';

// mock example
const data = [0, 1, 2]

export const EatenMealsSection = (props) => {
	return (
		<FlatList
		 data={data}
		 renderItem={() => <FoodItem navigation={props.navigation} />}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		/>
	)
}