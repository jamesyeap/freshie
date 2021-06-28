import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavigationHeader } from '../../_molecules/NavigationHeader';
import { RegularText } from '../../_atoms/Text';
import { TabView, SceneMap } from 'react-native-tab-view';

import TrainerMealsSection from '../../_organisms/TrainerMealsSection/TrainerMealsSection';
import CustomMealsSection from '../../_organisms/CustomMealsSection/CustomMealsSection';
import FavoriteMealsSection from '../../_organisms/FavoriteMealsSection/FavoriteMealsSection';
import { ButtonModal } from '../../_molecules/ButtonModal';

import { getRecipeList_API, getMealPlans_API } from '../../../_utilities/_api/Recipe';

/* 
	Didn't use the one from Atoms folder as "alignItems" causes the 
	TabView component to not render at all.
*/
const Container = styled.SafeAreaView`
	flex: 1;
	flexDirection: column;
	justifyContent: center;
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
	borderBottomWidth: ${props => props.isSelected ? "1px" : 0 };
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
			<TabButton title="Trainer" onPress={() => props.setIndex(0)} isSelected={props.index === 0} />
			<TabButton title="Custom" onPress={() => props.setIndex(1)}  isSelected={props.index === 1} />
			<TabButton title="Favorites" onPress={() => props.setIndex(2)} isSelected={props.index === 2} />
		</TabBarContainer>
	)
}
      

export default function MealsPage(props) {
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'first', title: 'First' },
		{ key: 'second', title: 'Second' },
		{ key: 'third', title: 'Third' }
	      ]);
	
	const secondRoute = () => <CustomMealsSection navigation={props.navigation}  />;
	const firstRoute = () => <TrainerMealsSection navigation={props.navigation}  />;
	const thirdRoute = () => <FavoriteMealsSection navigation={props.navigation}  />;

	const renderScene = SceneMap({
		first: firstRoute,
		second: secondRoute,
		third: thirdRoute
	})

	// Fetches list of recipes before rendering the page
	useEffect(() => {
		getRecipeList_API("custom");
		getMealPlans_API();
	}, []);

	return (
		<Container>
			<NavigationHeader goTo={() => props.navigation.goBack()}/>

			<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			renderTabBar={props => <TabBar key={index} index={index} setIndex={setIndex} {...props} />}
			onIndexChange={setIndex}
			sceneContainerStyle={{ alignItems: "center" }}
		
			/>
		</Container>
	)
}

