import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { RegisterPage, SignupPage, LoginPage } from '../_components/pages/index';
import { ClientStackScreen } from './ClientStackScreen';
import { TrainerStackScreen } from './TrainerStackScreen'

const AuthStack = createStackNavigator();

export const AuthStackScreen = () => (
	<AuthStack.Navigator headerMode="none">
		<AuthStack.Screen name="Login" component={LoginPage} />
		<AuthStack.Screen name="Register" component={RegisterPage} />
		<AuthStack.Screen name="Signup" component={SignupPage} />
		{/* CLIENT and TRAINER STACK SCREENS NOT SUPPOSED TO BE HERE; FOR TESTING PURPOSES ONLY */}
		<AuthStack.Screen name="Client" component={ClientStackScreen} />
		<AuthStack.Screen name="Trainer" component={TrainerStackScreen} />
	</AuthStack.Navigator>
)