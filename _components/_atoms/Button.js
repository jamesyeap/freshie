import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Checkbox as PaperCheckbox } from 'react-native-paper';
import { SemiBoldText } from './Text';
import { TouchableOpacity } from 'react-native';

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
	height: 48px;
	width: 300px;
	borderRadius: 6px;
	marginTop: ${props => props.marginTop ? props.marginTop : 0};
`;

{/*}	margin: ${props => props.margin ? props.margin : 0};*/}
export const BigButtonText = styled(SemiBoldText)`
	fontSize: 18;
	lineHeight: 28;
	color: #FFFFFF;
`;

export const BigButton = ({label, state, onPress,...props}) => {
	return (<BigButtonContainer marginTop= {props.marginTop} state={state} onPress={onPress}>
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

export const EditButtonContainer = styled(TouchableOpacity)`
	flexDirection: column;
	justifyContent: center;
	alignItems: center;	
	backgroundColor: ${props => props.color ? props.color : "#000000"}
	borderRadius: 6px;
	width: 88px;
	height: 32px;
	margin: ${props => props.margin ? props.margin : 0}
`
export const EditButtonText = styled(SemiBoldText)`
	fontSize: 18;
	lineHeight: 28;
	color: #FFFFFF;
`;

//export const EditButtonIcon = styled()

export const EditButton = ({label, state, color, onPress, margin,...props}) => {
	return (
		<EditButtonContainer color= {color} margin= {margin} state= {state} onPress= {onPress}>
			<EditButtonText>{label}</EditButtonText>
		</EditButtonContainer>
	)	
}



