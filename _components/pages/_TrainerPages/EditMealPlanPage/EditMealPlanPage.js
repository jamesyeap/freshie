import React from 'react';
import styled from 'styled-components';
import { Header } from '../../../_molecules/Header';
import { NavigationHeader } from '../../../_molecules/NavigationHeader';
import { Container } from '../../../_atoms/Container';
import { FoodItem } from '../../../_molecules/FoodItem';
import { EditMealPlanSection } from '../../../_organisms/_TrainerOrganisms/EditMealPlanSection';

export default function EditMealPlanPage(props) {
	return (
		<Container>
			<Header
			containerStyle={{ alignItems: "flex-start", width: 310 }}
			headerText="Meal Plan 1"
			subheaderText="Bob"
			/>

			<EditMealPlanSection />
		</Container>
	);
}