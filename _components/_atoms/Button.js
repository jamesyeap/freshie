import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Checkbox as PaperCheckbox } from 'react-native-paper';
import { SemiBoldText } from './Text';

/* List of Buttons
	- Big Button
	- Text Button
	- Checkbox
	- Section Button
*/

// BIG BUTTON 
const BigButtonContainer = styled.TouchableOpacity`
	flexDirection: column;
	justifyContent: center;
	alignItems: center;
	backgroundColor: ${props => props.state === "default" 
					? "#319795"
					: props.state === "active"
						? "#285E61"
						: props.state === "disabled"
							? "#319795" 
							: "#319795" 
			};
	height: 48px;
	width: 300px;
	borderRadius: 6px;
	margin: ${props => props.margin ? props.margin : "0px"};
`;

export const BigButtonText = styled(SemiBoldText)`
	fontSize: 18;
	lineHeight: 28;
	color: #FFFFFF;
`;

export const BigButton = ({label, state, onPress,...props}) => {
	return (<BigButtonContainer margin={props.margin} state={state} onPress={onPress}>
			<BigButtonText>{label}</BigButtonText>
		</BigButtonContainer>);
}

// TEXT BUTTON 
const TextButtonContainer = styled.TouchableOpacity`
	flexDirection: column;
	justifyContent: center;
	alignItems: center;
	margin: ${props => props.margin ? props.margin : "0px"};
`;

export const TextButtonText = styled(SemiBoldText)`
	fontSize: 14;
	lineHeight: 20;
	color: #000000;
`;

export const TextButton = ({label, state, onPress,...props}) => {
	return (<TextButtonContainer margin={props.margin} state={state} onPress={onPress} {...props}>
			<TextButtonText>{label}</TextButtonText>
		</TextButtonContainer>);
}

const CheckboxContainer = styled.View`
	flexDirection: row;
	justifyContent: center;
	alignItems: center;
`;

export const CheckboxText = styled(SemiBoldText)`
	fontSize: 14;
	lineHeight: 20;
	color: #000000;
	marginRight: 9px;
`;

// Checkbox
	// note: used "PaperCheckbox.Android" instead of "PaperCheckbox.IOS" as there is a bug where checkbox is invisible when unchecked"
export const Checkbox = ({label, ...props}) => {
	const [checked, setChecked] = useState(false);

	return (
		<CheckboxContainer>
			<PaperCheckbox.Android status={checked ? "checked" : "unchecked"} onPress={() => setChecked(!checked)} testID="checkbox" />
			{label && <CheckboxText>{label}</CheckboxText>}
		</CheckboxContainer>
		)
}

// Section Button
const SectionButtonContainer = styled.TouchableOpacity`
	flexDirection: column;
	justifyContent: flex-end;
	alignItems: flex-end;
	backgroundColor: ${props => props.backgroundColor ? props.backgroundColor : "#583AAB"}
	width: 310px;
	height: 120px;
	borderRadius: 10px;
	margin: ${props => props.margin ? props.margin : "0px"};
	padding: 15px;
`;

const SectionButtonTextContainer = styled.View`
	flexDirection: column;
	justifyContent: center;
	alignItems: flex-start;
	alignSelf: flex-start;
`;

export const SectionButtonMainText = styled(SemiBoldText)`
	fontSize: 30;
	lineHeight: 36;
	color: #FFFFFF;
`;

export const SectionButtonSubText = styled(SemiBoldText)`
	fontSize: 14;
	lineHeight: 20;
	color: #9277DB;
`;

export const SectionButton = ({mainText, subText, onPress, ...props}) => {
	return (
		<SectionButtonContainer margin={props.margin} backgroundColor={props.backgroundColor} onPress={onPress}>
			<SectionButtonTextContainer>
				<SectionButtonMainText>{mainText}</SectionButtonMainText>
				<SectionButtonSubText>{subText}</SectionButtonSubText>
			</SectionButtonTextContainer>
		</SectionButtonContainer>
		);
}



