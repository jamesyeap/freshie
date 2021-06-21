import React from 'react';
import { Image } from 'react-native-ui-lib';
import styled from 'styled-components';
import { SemiBoldText } from '../_atoms/Text';
import { ExtraSmallButton, TextButton } from '../_atoms/Button';
import { Divider, IconButton } from 'react-native-paper';
import { Info } from './Info';

const FoodItemContainer = styled.View`
	flexDirection: row;
	alignItems: center
	width: 310px;
	height: 77px;
	borderRadius: 10px;
	borderWidth: 1px;
	borderColor: #E6F2FC;
	backgroundColor: #FFFFFF;
	margin: ${props => props.margin ? props.margin : "12.5px"};
`;

const FoodItemInfoContainer = styled.View`
	flexDirection: column;
	marginRight: 30px;
`;

const FoodItemNameText = styled(SemiBoldText)`
	fontSize: 18px;
	lineHeight: 28px;
`;

const ButtonsContainer = styled.View`
	flexDirection: column;
	alignItems: flex-end;
	justifyContent: center;
	marginLeft: 30px;
	marginRight: 12px;
`;

export const FoodItem = (props) => {
	/* 
		There are 3 variations of this button.

		- client-trainer
		- client-custom
		- client-favorites

		
	*/ 

	const options = () => {
		<ButtonsContainer>
			<ExtraSmallButton 
			label="Consume"
			onPress={() => props.navigation.navigate("Home")}
			/>
			<TextButton 
			label="Edit"
			size="xs"
			onPress={() => props.navigation.push("EditRecipe")}
			/>	
		</ButtonsContainer>
	}

	return (
		<FoodItemContainer margin={props.margin} >
			<Image 
			source={require('../../assets/taco.png')}
			style={{ height: 50, width: 50, marginLeft: 21, marginRight: 33}}
			/>		

			<FoodItemInfoContainer>
				<FoodItemNameText>Taco</FoodItemNameText>
				<Info
				value={200}
				unit="kcal"
				/>
			</FoodItemInfoContainer>

			<Divider style={{ width: 1, height: 48, marginLeft: "auto" }} />

			<ButtonsContainer>
				<ExtraSmallButton 
				label="Consume"
				onPress={() => props.navigation.navigate("Home")}
				/>
				<TextButton 
				label="Edit"
				size="xs"
				onPress={() => props.navigation.push("EditRecipe")}
				/>
			</ButtonsContainer>
		</FoodItemContainer>
	);
}
