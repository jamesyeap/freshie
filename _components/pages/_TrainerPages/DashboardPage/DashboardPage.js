import React, { useState } from 'react';
import styled from 'styled-components';
import { NavigationHeader } from '../../../_molecules/NavigationHeader';
import { RegularText } from '../../../_atoms/Text';
import { TabView, SceneMap } from 'react-native-tab-view';

import { ClientsDashboardSection } from '../../../_organisms/_TrainerOrganisms/ClientsDashboardSection';
import { MealPlansDashboardSection } from '../../../_organisms/_TrainerOrganisms/MealPlansDashboardSection';
import { MealsDashboardSection } from '../../../_organisms/_TrainerOrganisms/MealsDashboardSection';
import { ReferralCode } from '../../../_molecules/ReferralCode';

const renderScene = SceneMap({
	first: ClientsDashboardSection,
	second: MealPlansDashboardSection,
	third: MealsDashboardSection
})

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
	borderBottomWidth: ${props => props.isSelected ? "1px" : "0px"};
`;

const TabButtonText = styled(RegularText)`
	fontSize: 16;
	lineHeight: 24;
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
      

export default function DashboardPage(prop) {
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'first', title: 'First' },
		{ key: 'second', title: 'Second' },
		{ key: 'third', title: 'Third' }
	      ]);

	return (
		<Container>
			<NavigationHeader />
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