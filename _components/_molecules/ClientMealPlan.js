import React from 'react';
import styled from 'styled-components';
import { RegularText, SemiBoldText } from '../_atoms/Text';
import { Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const MediumComponentContainer = styled.TouchableOpacity`
	flexDirection: row;
	borderWidth: 1px;
	borderColor: #E6F2FC;
	padding: 13px 18px;
	alignItems: center;
	justifyContent: center;
	margin: 12px;
	borderRadius: 10px;
	width: 330px;
`;

const MealTextContainer = styled.View`
	flexDirection: column;
	marginRight: 20px;
`;

const PreviewTextContainer = styled.View`
	flexDirection: column;
`;

const MealPlanNameText = styled(SemiBoldText)`
	fontSize: 24px;
	lineHeight: 32px;
`;

const PreviewText = styled(RegularText)`
	fontSize: 14px;
	lineHeight: 20px;
`;

const InfoContainer = styled.View`
	flexDirection: column;
	justifyContent: space-evenly;
	alignItems: center;
	marginLeft: 15px;
	height: 100%;
	paddingTop: 15px;
`;

const CalorieText = styled(RegularText)`
	fontSize: 14px;
	lineHeight: 20px;
`;

const Wrapper = styled.View`
	flexDirection: column;
	alignItems: center;
	justifyContent: center;
`;

export const ClientMealPlan = ({ id, goTo, mealPlanDetails,...props }) => {
	console.log(mealPlanDetails);
	const { title, meal } = mealPlanDetails;

	let totalCalories = 0;

	meal.forEach(e => {
		console.log(e.calories);
		totalCalories += e.calories
	});
	
	return (
		<Wrapper>
			<MediumComponentContainer onPress={goTo}>
				<MealTextContainer>
					<MealPlanNameText>{title}</MealPlanNameText>
					<PreviewTextContainer>
						{ 
							meal.length >= 3
								? meal.map(e => <PreviewText>{e.title}</PreviewText>) 
								: meal.slice(0, 2).map(e => <PreviewText>{e.title}</PreviewText>)
						}
					</PreviewTextContainer>
				</MealTextContainer>	

				<Divider style={{ width: 1, height: 70, marginLeft: "auto" }} />

				<InfoContainer>
					<CalorieText>{totalCalories} kcal</CalorieText>
					
					<Ionicons
					 name="chevron-forward-circle-outline"
					 size={25}
					/>
				</InfoContainer>
			</MediumComponentContainer>
		</Wrapper>
	)
}