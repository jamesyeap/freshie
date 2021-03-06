import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { HomePage, MealsPage, EatingHistoryPage, AddItemPage, RecipePage, SearchPage, RestaurantsPage} from '../_components/pages/index';

const ClientStack = createStackNavigator();

export const ClientStackScreen = () => (
	<ClientStack.Navigator headerMode="none" >
		<ClientStack.Screen name="Home" component={HomePage} />
		<ClientStack.Screen name="Meals" component={MealsPage} />
		<ClientStack.Screen name="Recipe" component={RecipePage}/>
		<ClientStack.Screen name="Search" component={SearchPage}/>
		<ClientStack.Screen name="EatingHistory" component={EatingHistoryPage} />
		<ClientStack.Screen name="EditRecipe" component={AddItemPage} />
		<ClientStack.Screen name="Restaurants" component={RestaurantsPage} />
	</ClientStack.Navigator>
)