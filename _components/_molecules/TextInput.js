import React from 'react';
import styled from 'styled-components';
import { RegularText, MediumText } from '../_atoms/Text';
import { Field } from 'formik';

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
		<TextInputContainer style={props.containerStyle} stacked= {props.stacked} >
			{props.label && <InputLabelText>{props.label}</InputLabelText>}
			<TextInputBox
			value={props.value}
			placeholder={props.placeholder}
			onChangeText={props.onChangeText}
			onBlur={props.onBlur}
			keyboardType={props.keyboardType}
			width={props.width ? props.width : 320}
			height={props.height ? props.height : 40}
			style={{ fontFamily: "Inter_400Regular", fontSize: 16, lineHeight: 24, paddingLeft: 5, paddingBottom: 5, borderColor: "#E2E8F0", borderWidth: 1, borderRadius: 6, textAlign: 'left' }}
			{...props}
			/>
			{props.feedbackMessage && props.touched && <InputFeedbackText>{props.feedbackMessage}</InputFeedbackText>}
		</TextInputContainer>
	)
}