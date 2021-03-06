import React from 'react';
import { Image } from 'react-native-ui-lib';
import styled from 'styled-components';
import { SemiBoldText } from '../_atoms/Text';
import { IconButton } from 'react-native-paper';

const ClientItemContainer = styled.TouchableOpacity`
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

const ClientInfoContainer = styled.View`
	flexDirection: column;
	alignItems: flex-start;
	justifyContent: center;
`;

const ClientNameText = styled(SemiBoldText)`
	fontSize: 18px;
	lineHeight: 28px;
`;

export const ClientItem = (props) => {
	return (
		<ClientItemContainer margin={props.margin} onPress={props.onPress} >
			<Image 
			source={require('../../assets/user.png')}
			style={{ height: 50, width: 50, marginLeft: 21, marginRight: 33}}
			/>
			
			<ClientInfoContainer>
				<ClientNameText>{props.clientDetails.user.first_name}</ClientNameText>
			</ClientInfoContainer>

			<IconButton
			 icon="chevron-right"
			 style={{ marginRight: 26, marginLeft: "auto" }}
			/>
		</ClientItemContainer>
	);
}
