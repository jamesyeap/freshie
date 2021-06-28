import React from 'react';
import { Image } from 'react-native-ui-lib';
import styled from 'styled-components';
import { SemiBoldText } from '../_atoms/Text';
import { Info } from './Info';

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

	const { id, title, calories, ingredients, instructions } = props.itemDetails;

	return (
		<FoodItemContainer margin={props.margin} onPress={() => props.setSelectedFoodItem(props.itemDetails)} >
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
