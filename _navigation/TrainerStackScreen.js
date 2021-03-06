import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { ClientPage, DashboardPage, EditMealPlanPage, AddItemPage, TrainerAccountPage, RecipePage, MealPlanPage, SearchPage, RestaurantsPage } from '../_components/pages/index';

const TrainerStack = createStackNavigator();

export const TrainerStackScreen = () => (
		<TrainerStack.Navigator headerMode="none" >
			<TrainerStack.Screen name="Dashboard" component={DashboardPage} />
			<TrainerStack.Screen name="Client" component={ClientPage} />
			<TrainerStack.Screen name="EditMealPlan" component={EditMealPlanPage} />
			<TrainerStack.Screen name="Recipe" component={RecipePage}/>
			<TrainerStack.Screen name="Search" component={SearchPage}/>
			<TrainerStack.Screen name="EditRecipe" component={AddItemPage} />
			<TrainerStack.Screen name="Account" component={TrainerAccountPage} />
			<TrainerStack.Screen name="MealPlanDetails" component={MealPlanPage} />
			<TrainerStack.Screen name="Restaurants" component={RestaurantsPage} />
		</TrainerStack.Navigator>
)