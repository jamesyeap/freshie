import React from 'react';
import { View, StyleSheet } from 'react-native'
import styled from 'styled-components';
import { Container } from '../../_atoms/Container';
import { HeaderMediumText } from '../../_atoms/Text';
import { MediumButton } from '../../_atoms/Button';
import { InfoPanel } from '../../_organisms/InfoPanel';
import { TrainerPanel } from '../../_organisms/TrainerPanel';
import { connect, useDispatch, useSelector } from 'react-redux';
import { logoutAsync_API } from '../../../_redux/actions/Auth.actions';

const NameText = styled(HeaderMediumText)`
	textAlign: left;
	marginTop: 19px;
	marginBottom: 19px;
	marginLeft: 41px;
	marginRight: auto;
	flexWrap: wrap;
	alignSelf: flex-start;
`;

export default function AccountPage({ scrolling, ...props }) {
	const dispatch = useDispatch();
	const { username } = useSelector(state => state.auth);
	const { caloriesConsumed, dailyCalories, personalTrainer }  = useSelector(state => state.client)

	return (
			<Container>
				<InfoPanel 
				infoOne={{
				label: "Height",
				value: 180,
				unit: "cm"
				}}
				infoTwo={{
				label: "Age",
				value: 22,
				unit: "years old"
				}}
				infoThree={{
				label: "Weight",
				value: 70,
				unit: "kg"
				}}
				infoFour={{
				label: "Target Weight",
				value: 60,
				unit: "kg"
				}}
				/>

				<InfoPanel
				labelColor="#9A8EBA"
				valueColor="#FFFFFF"
				unitColor="#9A8EBA"
				backgroundColor="#583AAB"

				infoOne={{
				label: "BMR",
				value: 180,
				}}
				infoTwo={{
				label: "Activity Level",
				value: "Slightly Active",
				}}
				infoThree={{
				label: "Today's Calories",
				value: caloriesConsumed,
				unit: "kcal"
				}}
				infoFour={{
				label: "Target Calories",
				value: dailyCalories,
				unit: "kcal"
				}}
				/>

				<TrainerPanel
				data={personalTrainer}
				/>

				<MediumButton
				label="Log Out"
				onPress={() => dispatch(logoutAsync_API())}
				/>
			</Container>
	)
}


