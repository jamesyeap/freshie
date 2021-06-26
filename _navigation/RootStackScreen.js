import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { AuthStackScreen } from './AuthStackScreen';
import { ClientStackScreen } from './ClientStackScreen';
import { TrainerStackScreen } from './TrainerStackScreen';
import { store } from '../_redux/store/store';
import { connect } from 'react-redux';

const RootStack = createStackNavigator();

function mapStateToProps(state) {
	const { token, isPersonalTrainer, loading, error } = state.auth;
	return { token, isPersonalTrainer, loading, error }
}

export function RootStackScreen(props) {
	const checkAuth = () => {
		if (props.token !== null) {
			if (props.isPersonalTrainer) {
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

export default connect(mapStateToProps)(RootStackScreen);

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