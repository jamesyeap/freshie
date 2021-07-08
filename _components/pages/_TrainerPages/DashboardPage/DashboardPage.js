import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { NavigationHeader } from '../../../_molecules/NavigationHeader';
import { RegularText, HeaderMediumText } from '../../../_atoms/Text';
import { TabView, SceneMap } from 'react-native-tab-view';
import { FAB } from '../../../_molecules/FAB';
import { CreateMealPlanModal } from './CreateMealPlanModal';

import { ClientsDashboardSection } from '../../../_organisms/_TrainerOrganisms/ClientsDashboardSection/ClientsDashboardSection';
import MealPlansDashboardSection from '../../../_organisms/_TrainerOrganisms/MealPlansDashboardSection/MealPlansDashboardSection';
import MealsDashboardSection from '../../../_organisms/_TrainerOrganisms/MealsDashboardSection/MealsDashboardSection';

import { getMealPlans_API, getRecipeList_API, createMealPlan_API } from '../../../../_redux/actions/Recipes.actions';
import { getClients_API, getReferralCode_API } from '../../../../_redux/actions/Trainer.actions';
import { connect, useDispatch } from 'react-redux';

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
	borderBottomWidth: ${props => props.isSelected ? "1px" : 0};
`;

const TabViewContainer = styled.View`
	height: 80%;
	flexDirection: column;
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

function mapStateToProps(state) {
	const { clients } = state.trainer;
	return { clients }
}

export function DashboardPage(props) {
	const [loading, setLoading] = useState(true);
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'first', title: 'First' },
		{ key: 'second', title: 'Second' },
		{ key: 'third', title: 'Third' }
	      ]);
	const [showCreateMealPlanModal, setShowCreateMealPlanModal] = useState(false);
	const [newMealPlanName, setNewMealPlanName] = useState("");

	const dispatch = useDispatch();

	const firstRoute = () => <ClientsDashboardSection navigation={props.navigation} data={props.clients} />;
	const secondRoute = () => <MealPlansDashboardSection navigation={props.navigation} />;
	const thirdRoute = () => <MealsDashboardSection navigation={props.navigation} />;

	const renderScene = SceneMap({
		first: firstRoute,
		second: secondRoute,
		third: thirdRoute
	})

	const loadData = () => {
	// 	/* PRELOAD DATA */
		Promise.all(
			dispatch(getRecipeList_API("custom")),
			dispatch(getMealPlans_API()),
			dispatch(getClients_API()),
			dispatch(getReferralCode_API()),
		).then(setLoading(false));
	}

	useEffect(loadData, []);

	const handleCreateMealPlan = () => {
		createMealPlan_API({ title: newMealPlanName })
		setNewMealPlanName("");
	}

	const handleCloseCreateMealPlanModal = () => {
		setShowCreateMealPlanModal(false);
		setNewMealPlanName("");
	}

	if (loading) {
		return (<Container>
				<HeaderMediumText>Loading...</HeaderMediumText>
			</Container>)
	} else {
		return (
			<Container>
				<NavigationHeader iconName="person-circle-outline" goTo={() => props.navigation.push("Account")} />
				<TabViewContainer>
				<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				renderTabBar={props => <TabBar index={index} setIndex={setIndex} {...props} />}
				onIndexChange={setIndex}
				sceneContainerStyle={{ alignItems: "center" }}
				/>
				</TabViewContainer>

				<FAB 
				variation="trainer"
				gotoAddMeal={() => props.navigation.push("EditRecipe", { type: "new" })}
				gotoAddMealPlan={() => setShowCreateMealPlanModal(true)}
				/>

				<CreateMealPlanModal
				modalVisible={showCreateMealPlanModal}
				handleClose={handleCloseCreateMealPlanModal}
				onChangeText={(value) => setNewMealPlanName(value)}
				onPress={handleCreateMealPlan}
				/>
			</Container>
		)
	}
}

export default connect(mapStateToProps)(DashboardPage);