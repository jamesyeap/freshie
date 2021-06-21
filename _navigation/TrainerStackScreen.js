import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { ClientPage, DashboardPage, EditMealPlanPage, EditRecipePage, TrainerAccountPage } from '../_components/pages/index';

const TrainerStack = createStackNavigator();

export const TrainerStackScreen = () => (
	<TrainerStack.Navigator headerMode="none" >
		<TrainerStack.Screen name="Dashboard" component={DashboardPage} />
		<TrainerStack.Screen name="Client" component={ClientPage} />
		<TrainerStack.Screen name="EditMealPlan" component={EditMealPlanPage} />
		<TrainerStack.Screen name="EditRecipe" component={EditRecipePage} />
		<TrainerStack.Screen name="Account" component={TrainerAccountPage} />
	</TrainerStack.Navigator>
)