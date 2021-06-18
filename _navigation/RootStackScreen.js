import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { AuthStackScreen } from './AuthStackScreen';
import { ClientStackScreen } from './ClientStackScreen';
import { TrainerStackScreen } from './TrainerStackScreen';

const RootStack = createStackNavigator();

export const RootStackScreen = ({ userToken }) => (
	<RootStack.Navigator headerMode="none">
		<RootStack.Screen name="Auth" component={AuthStackScreen} />
		{/* <RootStack.Screen name="Client" component={ClientStackScreen} /> */}
		{/* <RootStack.Screen name="Trainer" component={TrainerStackScreen} /> */}
	</RootStack.Navigator>
);

/* THIS IS A SEMI-CORRECT WAY TO DO THINGS; KEEPING THIS HERE FOR REFERENCE

export const RootStackScreen = ({ userToken }) => (
	<RootStack.Navigator headerMode="none">
	  {userToken  
		? (<RootStack.Screen
			name="Client"
			component={ClientStackScreen}
			options={{
				animationEnabled: false,
			}}
		/>) 
		: (<RootStack.Screen
			name="Auth"
			component={AuthStackScreen}
			options={{
				animationEnabled: false,
			}}
		/>)
	}
	</RootStack.Navigator>
);

*/