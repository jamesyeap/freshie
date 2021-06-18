import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { ClientPage, DashboardPage, EditMealPlanPage } from '../_components/pages/index';

const TrainerStack = createStackNavigator();

export const TrainerStackScreen = () => (
	<TrainerStack.Navigator>
		<TrainerStack.Screen name="Client" component={ClientPage} />
		<TrainerStack.Screen name="Dashboard" component={DashboardPage} />
		<TrainerStack.Screen name="EditMealPlan" component={EditMealPlanPage} />
	</TrainerStack.Navigator>
)