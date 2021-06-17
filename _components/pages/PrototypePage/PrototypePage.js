import React from 'react';
import styled from 'styled-components';
import { Container } from '../../_atoms/Container';

/* Insert Components To Preview Here  */
// import { Info } from '../../_molecules/Info';
// import { CalorieTracker } from '../../_organisms/CalorieTracker';
// import { InfoPanel } from '../../_organisms/InfoPanel';
// import { FoodItem } from '../../_molecules/FoodItem';
// import { MealPlan } from '../../_molecules/MealPlan';
// import { TrainerMealsSection } from '../../_organisms/TrainerMealsSection';
// import { CustomMealsSection } from '../../_organisms/CustomMealsSection';
// import { ClientItem } from '../../_molecules/ClientItem';
import { ClientsDashboardSection } from '../../_organisms/_TrainerOrganisms/ClientsDashboardSection';

const infoOne = {
	label: "Height",
	value: 40,
	unit: "cm"
}

export default function PrototypePage(props) {
	return (
		<Container>
			<ClientsDashboardSection />
		</Container>
	)
}
