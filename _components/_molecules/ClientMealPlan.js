import React from 'react';
import styled from 'styled-components';
import { MediumComponentContainer as ParentContainer } from '../_atoms/Container';
import { RegularText, MediumText, SemiBoldText } from '../_atoms/Text';
import { Divider, IconButton } from 'react-native-paper';
import { Info } from '../_molecules/Info';
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
`;

const MealTextContainer = styled.View`
	flexDirection: column;
	marginRight: 20px;
`;

const PreviewTextContainer = styled.View`
	flexDirection: column;
`;

const MealPlanNameText = styled(SemiBoldText)`
	fontSize: 24;
	lineHeight: 32;
`;

const PreviewText = styled(RegularText)`
	fontSize: 14;
	lineHeight: 20;
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

export const ClientMealPlan = ({ id, goTo, ...props }) => {
	return (
		<Wrapper>
			<MediumComponentContainer onPress={goTo}>
				<MealTextContainer>
					<MealPlanNameText>Meal Plan 1</MealPlanNameText>
					<PreviewTextContainer>
						<PreviewText>Taco</PreviewText>
						<PreviewText>Fish n Chips</PreviewText>
						<PreviewText>Steak</PreviewText>
					</PreviewTextContainer>
				</MealTextContainer>	

				<Divider style={{ width: 1, height: 70, marginLeft: "auto" }} />

				<InfoContainer>
					<CalorieText>600 kcal</CalorieText>
					
					<Ionicons
					 name="chevron-forward-circle-outline"
					 size={25}
					/>
				</InfoContainer>
			</MediumComponentContainer>
		</Wrapper>
	)
}