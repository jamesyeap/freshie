import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { ClientPage, DashboardPage, EditMealPlanPage, AddItemPage, TrainerAccountPage, RecipePage, MealPlanPage, SearchPage } from '../_components/pages/index';
import { Provider } from 'react-native-paper';

const TrainerStack = createStackNavigator();

export const TrainerStackScreen = () => (

	<Provider>
		<TrainerStack.Navigator headerMode="none" >
			<TrainerStack.Screen name="Dashboard" component={DashboardPage} />
			<TrainerStack.Screen name="Client" component={ClientPage} />
			<TrainerStack.Screen name="EditMealPlan" component={EditMealPlanPage} />
			<TrainerStack.Screen name="Recipe" component={RecipePage}/>
			<TrainerStack.Screen name="Search" component={SearchPage}/>
			<TrainerStack.Screen name="EditRecipe" component={AddItemPage} />
			<TrainerStack.Screen name="Account" component={TrainerAccountPage} />
			<TrainerStack.Screen name="MealPlanDetails" component={MealPlanPage} />
		</TrainerStack.Navigator>
	</Provider>
)