import React, { useState } from 'react';
import styled from 'styled-components';
import { MediumComponentContainer as ParentContainer } from '../_atoms/Container';
import { RegularText, MediumText, SemiBoldText } from '../_atoms/Text';
import { Info } from '../_molecules/Info';
import { Divider, IconButton } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import { FoodItem } from './FoodItem';
import { SmallButton } from '../_atoms/Button';
import { ButtonGroup } from '../_molecules/ButtonGroup';

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
	fontSize: 24px;
	lineHeight: 32px;
`;

const PreviewText = styled(RegularText)`
	fontSize: 14px;
	lineHeight: 20px;
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

export const MealPlan = ({ id, title, recipes, open, setVisible, ...props }) => {
	let totalCalories = 0;

	recipes.forEach(e => {
		console.log(e.calories);
		totalCalories += e.calories
	});

	return (
		<Wrapper>
			<MediumComponentContainer isOpen={open}>
				<MealTextContainer>
					<MealPlanNameText>{title}</MealPlanNameText>
					<PreviewTextContainer>
						{ 
							recipes.length >= 3
								? recipes.map(e => <PreviewText>{e.title}</PreviewText>) 
								: recipes.slice(0, 2).map(e => <PreviewText>{e.title}</PreviewText>)
						}
					</PreviewTextContainer>
				</MealTextContainer>	

				<Divider style={{ width: 1, height: 70, marginLeft: "auto" }} />

				<InfoContainer>
					<CalorieText>{`${totalCalories} kcal`}</CalorieText>
					
					<IconButton
					icon={open ? "chevron-up" : "chevron-down"}
					size={35}
					onPress={() => props.handleExpandMealPlan({ id, title, recipes, ...props })}
					/>
				</InfoContainer>
			</MediumComponentContainer>

			<Collapsible collapsed={!open}>
				<ButtonGroup containerStyle={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
					<SmallButton label="Assign to Client" onPress={props.handleAssignToClient} buttonStyle={{ width: 140, marginRight: 10 }} />
					<SmallButton label="Add recipe" onPress={props.handleAddFoodItem} buttonStyle={{ width: 140 }} />
				</ButtonGroup>

				<FoodItemListContainer>
					{
						recipes.map(e => <FoodItem margin={0} navigation={props.navigation} itemDetails={e} setSelectedFoodItem={props.setSelectedFoodItem} />)
					}
				</FoodItemListContainer>
			</Collapsible>
		</Wrapper>
	)
}

