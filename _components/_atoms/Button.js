import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Checkbox as PaperCheckbox } from 'react-native-paper';
import { SemiBoldText } from './Text';
import { Ionicons } from '@expo/vector-icons';
// see list of icons available at "https://icons.expo.fyi"
import { TouchableOpacity } from 'react-native';

/* List of Buttons
	- Extra Small Button
	- Small Button
	- Medium Button
	- Big Button
	- Text Button
	- Checkbox
	- Section Button
	- Icon Button
*/

// EXTRA SMALL BUTTON 
const ExtraSmallButtonContainer = styled.TouchableOpacity`
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
	height: 21px;
	borderRadius: 6px;
	margin: ${props => props.margin ? props.margin : 0};
	padding: 2.5px 8px;
`;

export const ExtraSmallButtonText = styled(SemiBoldText)`
	fontSize: 12px;
	lineHeight: 16px;
	color: #FFFFFF;
`;

export const ExtraSmallButton = ({label, state, onPress,...props}) => {
	return (<ExtraSmallButtonContainer margin={props.margin} state={state} onPress={onPress}>
			<ExtraSmallButtonText>{label}</ExtraSmallButtonText>
		</ExtraSmallButtonContainer>);
}

// SMALL BUTTON 
const SmallButtonContainer = styled.TouchableOpacity`
	flexDirection: column;
	justifyContent: center;
	alignItems: center;
	backgroundColor: ${props => props.isSelected ? "#1e5d5c" : "#319795"};
	height: 32px;
	borderRadius: 6px;
	margin: ${props => props.margin ? props.margin : 0};
`;

export const SmallButtonText = styled(SemiBoldText)`
	fontSize: 14px;
	lineHeight: 20px;
	color: #FFFFFF;
`;

export const SmallButton = ({label, state, onPress, isSelected, buttonStyle,...props}) => {
	return (<SmallButtonContainer margin={props.margin} state={state} onPress={onPress} isSelected={isSelected} style={buttonStyle} >
			<SmallButtonText>{label}</SmallButtonText>
		</SmallButtonContainer>);
}

// MEDIUM BUTTON 
const MediumButtonContainer = styled.TouchableOpacity`
	flexDirection: column;
	justifyContent: center;
	alignItems: center;
	backgroundColor: ${props => props.backgroundColor ? props.backgroundColor : "#D53F8C"} 
	height: 48px;
	borderRadius: 6px;
	margin: ${props => props.margin ? props.margin : 0};
	padding: 10px 24px;
`;

export const MediumButtonText = styled(SemiBoldText)`
	fontSize: 18px;
	lineHeight: 28px;
	color: #FFFFFF;
`;

export const MediumButton = ({label, backgroundColor, onPress,...props}) => {
	return (<MediumButtonContainer margin={props.margin} backgroundColor={backgroundColor} onPress={onPress}>
			<MediumButtonText>{label}</MediumButtonText>
		</MediumButtonContainer>);
}

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
	margin: ${props => props.margin ? props.margin : 0};
	marginTop: ${props => props.marginTop ? props.marginTop : 0};
`;

{/*}	margin: ${props => props.margin ? props.margin : 0};*/}
export const BigButtonText = styled(SemiBoldText)`
	fontSize: 18px;
	lineHeight: 28px;
	color: #FFFFFF;
`;

export const BigButton = ({label, state, onPress,...props}) => {
	return (<BigButtonContainer marginTop= {props.marginTop} margin={props.margin} state={state} onPress={onPress}>
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
	fontSize: ${props => props.size === "xs" ? "12px" : "14px"};
	lineHeight: ${props => props.size === "xs" ? "16px" : "20px"};
	color: #000000;
`;

export const TextButton = ({label, state, onPress, size, buttonStyle, textStyle, ...props}) => {
	return (<TextButtonContainer margin={props.margin} state={state} onPress={onPress} style={buttonStyle}>
			<TextButtonText size={size} style={textStyle}>{label}</TextButtonText>
		</TextButtonContainer>);
}

const CheckboxContainer = styled.View`
	flexDirection: row;
	justifyContent: center;
	alignItems: center;
`;

export const CheckboxText = styled(SemiBoldText)`
	fontSize: 14px;
	lineHeight: 20px;
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
	margin: ${props => props.margin ? props.margin : 0};
	padding: 15px;
`;

const SectionButtonTextContainer = styled.View`
	flexDirection: column;
	justifyContent: center;
	alignItems: flex-start;
	alignSelf: flex-start;
`;

export const SectionButtonMainText = styled(SemiBoldText)`
	fontSize: 30px;
	lineHeight: 36px;
	color: #FFFFFF;
`;

export const SectionButtonSubText = styled(SemiBoldText)`
	fontSize: 14px;
	lineHeight: 20px;
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

// ICON BUTTON 
const IconButtonContainer = styled.TouchableOpacity`
	flexDirection: row;
	justifyContent: center;
	alignItems: center;
	padding: 6px;
	backgroundColor: ${props => props.color ? props.color : "transparent"}
	borderRadius: 6px;
`;

const IconButtonText = styled(SemiBoldText)`
	fontSize: 12px;
	lineHeight: 16px;
	color: #FFFFFF;
	marginLeft: 8px; 
`;

export const IconButton = ({ iconName, iconSize, iconColor, buttonColor, buttonLabel, buttonStyle, onPress,...props }) => {
	return (
		<IconButtonContainer color={buttonColor} style={buttonStyle} onPress={onPress} >
			<Ionicons
			name={iconName}
			size={iconSize}
			color={iconColor ? iconColor : "#FFFFFF"}
			/>

			{buttonLabel && <IconButtonText>{buttonLabel}</IconButtonText>}
		</IconButtonContainer>
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
	fontSize: 18px;
	lineHeight: 28px;
	color: #FFFFFF;
`;

//export const EditButtonIcon = styled()

export const EditButton = ({label, state, color, onPress, margin,...props}) => {
	return (
		<EditButtonContainer color= {color} margin= {margin} state= {state} onPress= {onPress}>
			<Ionicons name={props.name} size={24}></Ionicons>
			<EditButtonText>{label}</EditButtonText>
		</EditButtonContainer>
	)	
}



