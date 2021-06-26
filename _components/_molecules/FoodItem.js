import React, { useRef } from 'react';
import { Modal } from "react-native";
import { Image } from 'react-native-ui-lib';
import styled from 'styled-components';
import { SemiBoldText } from '../_atoms/Text';
import { ExtraSmallButton, TextButton } from '../_atoms/Button';
import { Divider, IconButton } from 'react-native-paper';
import { Modalize } from 'react-native-modalize';
import { Host, Portal } from 'react-native-portalize';
import { Info } from './Info';
import { addConsumedMeal_API } from '../../_utilities/_api/User';
import { deleteRecipe_API } from '../../_utilities/_api/Recipe';
import { PrototypePage } from '../pages';

const FoodItemContainer = styled.TouchableOpacity`
	flexDirection: row;
	alignItems: center
	width: 310px;
	minHeight: 77px;
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

export const FoodItem = (props) => {

	/* IN-PROGRESS!
		There are a few variations of this button.
		- client-trainer
		- client-custom
		- client-favorites
		- more...
	*/ 

	const handleLoadModal = () => {
		props.setSelectedFoodItem(props.itemDetails);
	}

	const { id, title, calories, ingredients, instructions } = props.itemDetails;

	return (
		<FoodItemContainer margin={props.margin} onPress={handleLoadModal} >
			<Image 
			source={require('../../assets/taco.png')}
			style={{ height: 50, width: 50, marginLeft: 21, marginRight: 33 }}
			/>		

			<FoodItemInfoContainer>
				<FoodItemNameText>{title}</FoodItemNameText>
				<Info
				value={calories}
				unit= "kcal"
				/>
			</FoodItemInfoContainer>
		</FoodItemContainer>
	);
}
