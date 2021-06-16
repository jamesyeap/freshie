import React from 'react';
import styled from 'styled-components';
import { MediumComponentContainer as ParentContainer } from '../_atoms/Container';
import { RegularText, MediumText, SemiBoldText } from '../_atoms/Text';
import { Info } from '../_molecules/Info';
import { Divider, IconButton } from 'react-native-paper';

const MediumComponentContainer = styled(ParentContainer)`
	flexDirection: row;
	borderWidth: 1px;
	backgroundColor: #FFFFFF;
	borderColor: #E6F2FC;
	padding: 13px 18px;
	alignItems: center;
	justifyContent: center;
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

export const MealPlan = (props) => {
	return (
		<MediumComponentContainer>
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
				<Info
				value={600}
				unit="kcal"
				/>
				
				<IconButton
				icon="chevron-down"
				size={35}
				/>
			</InfoContainer>
		</MediumComponentContainer>
	)
}

/* 
			<Divider style={{ width: 1, height: 48 }} />
*/
