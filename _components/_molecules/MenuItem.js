import React from 'react';
import { Image } from 'react-native-ui-lib';
import styled from 'styled-components';
import { SemiBoldText } from '../_atoms/Text';
import { Info } from './Info';

const MenuItemContainer = styled.TouchableOpacity`
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

const MenuItemInfoContainer = styled.View`
	flexDirection: column;
	marginRight: 30px;
`;

const MenuItemNameText = styled(SemiBoldText)`
	fontSize: 18px;
	lineHeight: 28px;
`;

export const MenuItem = (props) => {

	const { id, name, description, calories} = props.itemDetails;

	return (
		<MenuItemContainer margin={props.margin} onPress={() => props.handlePressMenuItem(props.itemDetails)} >
			<Image 
			source={require('../../assets/taco.png')}
			style={{ height: 50, width: 50, marginLeft: 21, marginRight: 33 }}
			/>		

			<MenuItemInfoContainer>
				<MenuItemNameText>{name}</MenuItemNameText>
				<Info
				value={calories}
				unit= "kcal"
				/>
			</MenuItemInfoContainer>
		</MenuItemContainer>
	);
}
