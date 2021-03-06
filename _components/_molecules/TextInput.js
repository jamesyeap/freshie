import React from 'react';
import styled from 'styled-components/native';
import { RegularText, MediumText } from '../_atoms/Text';

const TextInputContainer = styled.View`
	flexDirection: column;
	justifyContent: center;
	margin: 10px;
	marginTop: ${props => props.stacked ? props.stacked : "10px"}
`;

const TextInputBox = styled.TextInput`
	
`;

export const InputLabelText = styled(MediumText)`
	fontSize: 16px;
	lineHeight: 24px;
	color: #2D3748;
	marginBottom: 8px;
`;

export const InputFeedbackText = styled(RegularText)`
	fontSize: 14px;
	lineHeight: 20px;
	color: #E53E3E;
	marginTop: 8px;
`;

export const TextInput = (props) => {
	return (
		<TextInputContainer style={props.containerStyle} stacked= {props.stacked} >
			{props.label && <InputLabelText style={props.labelStyle}>{props.label}</InputLabelText>}
			<TextInputBox
			autoCapitalize="none"
			value={props.value}
			placeholder={props.placeholder}
			onChangeText={props.onChangeText}
			onBlur={props.onBlur}
			keyboardType={props.keyboardType}
			width={props.width ? props.width : 320}
			minHeight={props.height ? props.height : 40}
			style={{ fontFamily: "Inter_400Regular", fontSize: 16, lineHeight: 24, paddingLeft: 5, paddingBottom: 5, borderColor: "#E2E8F0", borderWidth: 1, borderRadius: 6, textAlign: 'left', ...props.inputStyle }}
			{...props}
			/>
			{props.feedbackMessage && props.touched && <InputFeedbackText>{props.feedbackMessage}</InputFeedbackText>}
		</TextInputContainer>
	)
}