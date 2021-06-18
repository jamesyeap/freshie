import React from 'react';
import { Image } from 'react-native-ui-lib';
import styled from 'styled-components';
import { SemiBoldText } from '../_atoms/Text';
import { ExtraSmallButton, TextButton } from '../_atoms/Button';
import { RegularText } from '../_atoms/Text';
import { Divider, IconButton } from 'react-native-paper';
import { Info } from './Info';

const ClientItemContainer = styled.TouchableOpacity`
	flexDirection: row;
	alignItems: center
	width: 310px;
	height: 120px;
	borderRadius: 10px;
	borderWidth: 1px;
	borderColor: #E6F2FC;
	backgroundColor: #FFFFFF;
	margin: ${props => props.margin ? props.margin : "12.5px"};
`;

const ClientInfoContainer = styled.View`
	flexDirection: column;
	alignItems: flex-start;
	justifyContent: center;
`;

const CaloriesText = styled(RegularText)`
	fontSize: 14;
	lineHeight: 20;
`;

const ClientNameText = styled(SemiBoldText)`
	fontSize: 18;
	lineHeight: 28;
`;

export const ClientItem = (props) => {
	return (
		<ClientItemContainer margin={props.margin} >
			<Image 
			source={require('../../assets/user.png')}
			style={{ height: 50, width: 50, marginLeft: 21, marginRight: 33}}
			/>
			
			<ClientInfoContainer>
				<ClientNameText>Bob</ClientNameText>
				<CaloriesText>200/2500 kcal</CaloriesText>
			</ClientInfoContainer>

			<IconButton
			 icon="chevron-right"
			 style={{ marginRight: 26, marginLeft: "auto" }}
			/>
		</ClientItemContainer>
	);
}
