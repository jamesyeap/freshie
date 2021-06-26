import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavigationHeader } from '../../../_molecules/NavigationHeader';
import { RegularText, HeaderMediumText } from '../../../_atoms/Text';
import { TabView, SceneMap } from 'react-native-tab-view';
import { FAB } from '../../../_molecules/FAB';

import { ClientsDashboardSection } from '../../../_organisms/_TrainerOrganisms/ClientsDashboardSection';
import MealPlansDashboardSection from '../../../_organisms/_TrainerOrganisms/MealPlansDashboardSection';
import MealsDashboardSection from '../../../_organisms/_TrainerOrganisms/MealsDashboardSection';
import ReferralCode from '../../../_molecules/ReferralCode';

import { getRecipeDetails_API, getMealPlans_API, deleteRecipe_API, getRecipeList_API } from '../../../../_utilities/_api/Recipe';
import { getClients_API, getReferralCode_API } from '../../../../_utilities/_api/Trainer';

/* 
	Didn't use the one from Atoms folder as "alignItems" causes the 
	TabView component to not render at all.
*/
const Container = styled.SafeAreaView`
	flex: 1;
	flexDirection: column;
	justifyContent: center;
	alignItems: center;
	backgroundColor: #CCD7E0;
`;

const TabBarContainer = styled.View`
	flexDirection: row;
	justifyContent: center;
	alignItems: center;
	width: 355px;
	alignSelf: center;
	marginTop: 20px;
	marginBottom: 20px;
`;

const TabButtonContainer = styled.TouchableOpacity`
	flexDirection: row;
	justifyContent: center;
	alignItems: center;
	width: 91px;
	padding: 8px;
	borderBottomColor: ${props => props.isSelected ? "#2B6CB0" : "#CCD7E0"}
	borderBottomWidth: ${props => props.isSelected ? 1 : 0};
`;

const TabButtonText = styled(RegularText)`
	fontSize: 16px;
	lineHeight: 24px;
	color: ${props => props.isSelected ? "#2B6CB0" : "#4A5568"};
`;

const TabButton = (props) => {
	return (
		<TabButtonContainer isSelected={props.isSelected} onPress={props.onPress}>
			<TabButtonText isSelected={props.isSelected} >{props.title}</TabButtonText>
		</TabButtonContainer>
	)
}

const TabBar = (props) => {
	return (
		<TabBarContainer>
			<TabButton title="Clients" onPress={() => props.setIndex(0)} isSelected={props.index === 0} />
			<TabButton title="Plans" onPress={() => props.setIndex(1)}  isSelected={props.index === 1} />
			<TabButton title="Meals" onPress={() => props.setIndex(2)} isSelected={props.index === 2} />
		</TabBarContainer>
	)
}
      

export default function DashboardPage(props) {
	const [loading, setLoading] = useState(true);
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'first', title: 'First' },
		{ key: 'second', title: 'Second' },
		{ key: 'third', title: 'Third' }
	      ]);

	const firstRoute = () => <ClientsDashboardSection navigation={props.navigation} />;
	const secondRoute = () => <MealPlansDashboardSection navigation={props.navigation} />;
	const thirdRoute = () => <MealsDashboardSection navigation={props.navigation} />;

	const renderScene = SceneMap({
		first: firstRoute,
		second: secondRoute,
		third: thirdRoute
	})

	const loadData = () => {
		/* PRELOAD DATA */
		getRecipeList_API();
		getMealPlans_API();	
		getClients_API();
		getReferralCode_API();
		
		setLoading(false);
	}

	useEffect(loadData, []);

	if (loading) {
		return (<Container>
				<HeaderMediumText>Loading...</HeaderMediumText>
			</Container>)
	} else {
		return (
			<Container>
				<NavigationHeader iconName="person-circle-outline" goTo={() => props.navigation.push("Account")} />
				<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				renderTabBar={props => <TabBar index={index} setIndex={setIndex} {...props} />}
				onIndexChange={setIndex}
				sceneContainerStyle={{ alignItems: "center" }}
				/>
				<ReferralCode />
			</Container>
		)
	}
}