import React from 'react';
import styled from 'styled-components';
import { SemiBoldText } from '../_atoms/Text';
import { ExtraSmallButton, TextButton } from '../_atoms/Button';
import { Divider, IconButton } from 'react-native-paper';
import { Info } from './Info';

const FoodItemContainer = styled.TouchableOpacity`
	flexDirection: row;
	alignItems: center
	width: 310px;
	height: 77px;
	borderRadius: 10px;
	borderWidth: 1px;
	borderColor: #E6F2FC;
	backgroundColor: #FFFFFF;
	margin: 12.5px;
`;

const FoodItemInfoContainer = styled.View`
	flexDirection: column;
	marginRight: 30px;
`;

const FoodItemNameText = styled(SemiBoldText)`
	fontSize: 18;
	lineHeight: 28;
`;

const ButtonsContainer = styled.View`
	flexDirection: column;
	alignItems: flex-end;
	justifyContent: center;
	marginLeft: 30px;
	marginRight: 12px;
`;

export const FoodItem = (props) => {
	return (
		<FoodItemContainer>
			<IconButton
			 icon="pizza"
			 style={{ height: 50, width: 50, marginLeft: 21 }}
			 onPress={() => console.log("Pressed")}
			/>
			<FoodItemInfoContainer>
			<FoodItemNameText>Taco</FoodItemNameText>
			<Info
			 value={200}
			 unit="kcal"
			/>
			</FoodItemInfoContainer>

			<Divider style={{ width: 1, height: 48, marginLeft: auto }} />

			<ButtonsContainer>
				<ExtraSmallButton 
				label="Consume"
				/>
				<TextButton 
				label="Edit"
				size="xs"
				/>
			</ButtonsContainer>
		</FoodItemContainer>
	);
}