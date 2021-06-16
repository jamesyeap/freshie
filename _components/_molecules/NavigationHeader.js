import React from 'react';
import styled from 'styled-components';
import { IconButton } from 'react-native-paper';
import { BrandHeaderText as ParentBrandHeaderText } from '../_atoms/Text';

const NavigationHeaderContainer = styled.View`
	flexDirection: row;
	width: 100%;
	justifyContent: center;
	alignItems: center;
`;

const BrandHeaderText = styled(ParentBrandHeaderText)`
	marginRight: 162px;
`;

// use icon="Account" for account icon
export const NavigationHeader = (props) => {
	return (
		<NavigationHeaderContainer>
			<IconButton
			icon={props.icon ? props.icon : "arrow-left"}
			color="#000000"
			size={25}
			style={{ marginRight: "auto", marginLeft: 34 }}
			onPress={props.onPress}
			/>
			<BrandHeaderText>freshie</BrandHeaderText>
		</NavigationHeaderContainer>
	)
}

