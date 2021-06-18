import React from 'react';
import styled from 'styled-components';
import { RegularText, MediumText } from '../_atoms/Text';

const TextInputContainer = styled.View`
	flexDirection: column;
	justifyContent: center;
	margin: 18px;
	marginTop: ${props => props.stacked ? props.stacked : 18}
`;

const TextInputBox = styled.TextInput`
`;

export const InputLabelText = styled(MediumText)`
	fontSize: 16;
	lineHeight: 24;
	color: #2D3748;
	marginBottom: 8px;
`;

export const InputFeedbackText = styled(RegularText)`
	fontSize: 14;
	lineHeight: 20;
	color: #E53E3E;
	marginTop: 8px;
`;

export const TextInput = (props) => {
	return (
		<TextInputContainer>
			{props.label && <InputLabelText>{props.label}</InputLabelText>}
			<TextInputBox
			value={props.value}
			placeholder={props.placeholder}
			onChangeText={props.onChangeText}
			keyboardType={props.keyboardType}
			width={props.width ? props.width : 320}
			height={props.height ? props.height : 40}
			style={{ fontFamily: "Inter_400Regular", fontSize: 16, lineHeight: 24, borderColor: "#E2E8F0", borderWidth: 1, borderRadius: 6, padding: 8, textAlign: 'left' }}
			/>
			{props.feedbackMessage && <InputFeedbackText>{props.feedbackMessage}</InputFeedbackText>}
		</TextInputContainer>
	)
}