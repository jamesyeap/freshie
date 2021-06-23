import React from 'react';
import styled from 'styled-components';
import { SmallButton } from '../_atoms/Button';
import { MediumText } from '../_atoms/Text';

const ButtonGroupContainer = styled.View`
	flexDirection: column;
	justifyContent: center;
	margin: 18px;
	marginTop: ${props => props.stacked ? props.stacked : "18px"}
`;

const ButtonsContainer = styled.View`
	flexDirection: ${props => props.vertical ? "column" : "row"};
	justifyContent: space-around;
	width: 50%;
`;

export const LabelText = styled(MediumText)`
	fontSize: 16px;
	lineHeight: 24px;
	color: #2D3748;
	marginBottom: 8px;
`;

export const ButtonGroup = ({ label, children, vertical, ...props }) => {
	return (
		<ButtonGroupContainer >
			{label && <LabelText>{label}</LabelText>}

			<ButtonsContainer vertical={vertical} >
				{children}
			</ButtonsContainer>
		</ButtonGroupContainer>
	)
}