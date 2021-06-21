import React from 'react';
import styled from 'styled-components';
import { IconButton } from '../_atoms/Button';
import { BrandHeaderText as ParentBrandHeaderText } from '../_atoms/Text';

const NavigationHeaderContainer = styled.View`
	flexDirection: row;
	width: 100%;
	justifyContent: center;
	alignItems: center;
`;

const BrandHeaderText = styled(ParentBrandHeaderText)`
	textAlign: left;
	marginRight: 162px;
	marginLeft: auto;
`;

// use icon="Account" for account icon
export const NavigationHeader = (props) => {
	return (
		<NavigationHeaderContainer>
			<IconButton
			iconName="arrow-back"
			iconSize={25}
			iconColor="black"
			buttonStyle={{ marginLeft: 30 }}
			onPress={() => props.goBack()}
			/>
			<BrandHeaderText>freshie</BrandHeaderText>
		</NavigationHeaderContainer>
	)
}

