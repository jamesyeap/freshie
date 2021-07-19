import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { AuthStackScreen } from './AuthStackScreen';
import { ClientStackScreen } from './ClientStackScreen';
import { TrainerStackScreen } from './TrainerStackScreen';
import { useSelector } from 'react-redux';

const RootStack = createStackNavigator();

export default function RootStackScreen(props) {
	const { token, isPersonalTrainer, loading, error } = useSelector(state => state.auth)

	const checkAuth = () => {
		if (token !== null) {
			if (isPersonalTrainer) {
				return <RootStack.Screen name="Trainer" component={TrainerStackScreen} />
			} else {
				return <RootStack.Screen name="Client" component={ClientStackScreen} />
			}
		} else {
			return <RootStack.Screen name="Auth" component={AuthStackScreen} />
		}	
	}

	return (
		<RootStack.Navigator headerMode="none">
			{checkAuth()}
		</RootStack.Navigator>
	);
	
}

