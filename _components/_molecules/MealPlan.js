import React, { useState } from 'react';
import styled from 'styled-components';
import { MediumComponentContainer as ParentContainer } from '../_atoms/Container';
import { RegularText, MediumText, SemiBoldText } from '../_atoms/Text';
import { Info } from '../_molecules/Info';
import { Divider, IconButton } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import { FoodItem } from './FoodItem';

const MediumComponentContainer = styled(ParentContainer)`
	flexDirection: row;
	borderWidth: 1px;
	backgroundColor: ${props => props.isOpen ? "#C2F1FB" : "#FFFFFF"};
	borderColor: #E6F2FC;
	padding: 13px 18px;
	alignItems: center;
	justifyContent: center;
	marginTop: 12.5px;
	marginBottom: ${props => props.isOpen ? 0 : 2};
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
	justifyContent: center;
	alignItems: center;
	marginLeft: auto;
	height: 100%;
	paddingTop: 15px;
`;

const CalorieText = styled(RegularText)`
	fontSize: 14px;
	lineHeight: 20px;
`;

const FoodItemListContainer = styled.View`
	flexDirection: column;
	marginBottom: 55px;
`;

const Wrapper = styled.View`
	flexDirection: column;
	alignItems: center;
	justifyContent: center;
`;

export const MealPlan = ({ id, open, setVisible }) => {
	return (
		<Wrapper>
			<MediumComponentContainer isOpen={open === id}>
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
					
					<IconButton
					icon={open !== id ? "chevron-down" : "chevron-up"}
					size={35}
					onPress={() => setVisible(id)}
					/>
				</InfoContainer>
			</MediumComponentContainer>

			<Collapsible collapsed={open !== id}>
				<FoodItemListContainer>
					<FoodItem margin={0}/>
					<FoodItem margin={0}/>
					<FoodItem margin={0}/>
				</FoodItemListContainer>
			</Collapsible>
		</Wrapper>
	)
}

