import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Checkbox as PaperCheckbox } from 'react-native-paper';
import { SemiBoldText } from './Text';

/* List of Buttons
	- Big Button
	- Text Button
	- Checkbox

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
	height: 48;
	width: 300;
	borderRadius: 6;
	margin: ${props => props.margin ? props.margin : 0};
`;

export const BigButtonText = styled(SemiBoldText)`
	fontSize: 18;
	lineHeight: 28;
	color: #FFFFFF;
`;

export const BigButton = ({label, state, onPress,...props}) => {
	return (<BigButtonContainer state={state} onPress={onPress}>
			<BigButtonText>{label}</BigButtonText>
		</BigButtonContainer>);
}

// TEXT BUTTON 
const TextButtonContainer = styled.TouchableOpacity`
	flexDirection: column;
	justifyContent: center;
	alignItems: center;
	margin: ${props => props.margin ? props.margin : 0};
`;

export const TextButtonText = styled(SemiBoldText)`
	fontSize: 14;
	lineHeight: 20;
	color: #000000;
`;

export const TextButton = ({label, state, onPress, margin,...props}) => {
	return (<TextButtonContainer state={state} onPress={onPress} {...props}>
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
	marginRight: 9;
`;

// Checkbox
	// note: used "PaperCheckbox.Android" instead of "PaperCheckbox.IOS" as there is a bug where checkbox is invisible when unchecked"
export const Checkbox = ({label, ...props}) => {
	const [checked, setChecked] = useState(false);

	return (
		<CheckboxContainer>
			<PaperCheckbox.Android status={checked ? "checked" : "unchecked"} onPress={() => setChecked(!checked)} />
			{label && <CheckboxText>{label}</CheckboxText>}
		</CheckboxContainer>
		)
}




