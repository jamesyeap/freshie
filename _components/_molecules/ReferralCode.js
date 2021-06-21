import React, { useState } from 'react';
import styled from 'styled-components';
import { RegularText, MediumText } from '../_atoms/Text';
import { Ionicons } from '@expo/vector-icons';
// see list of icons available at "https://icons.expo.fyi"

const Container = styled.View`
	flexDirection: column;
	height: 72px;
	marginBottom: 10px;
`;

const TextInputContainer = styled.View`
	flexDirection: column;
	justifyContent: center;
	borderRadius: 10px;
`;

const TextInputBox = styled.TextInput`
	fontFamily: "Inter_400Regular";
	fontSize: 16px;
	lineHeight: 24px;
	width: 276px;
	height: 40px;
	borderColor: #E2E8F0;
	borderWidth: 1px;
	borderRadius: 6px;
	padding: 8px;
	textAlign: left;
	backgroundColor: ${props => props.copied ? "#C2F1FB" : "#CCD7E0"}
`;

const LabelText = styled(MediumText)`
	fontSize: 16px;
	lineHeight: 24px;
	color: #9E8D8D;
	marginBottom: 2px;
	textAlign: left;
`;

const FeedbackText = styled(RegularText)`
	fontSize: 14px;
	lineHeight: 20px;
	color: #000000;
	marginTop: 2px;
	marginRight: 12px;
	textAlign: right;
`;

const TextInput = (props) => {
	return (
		<TextInputContainer>
			<TextInputBox
			value={props.value}
			placeholder={props.placeholder}
			editable={false}
			copied={props.copied}
			/>
			{props.feedbackMessage && <InputFeedbackText>{props.feedbackMessage}</InputFeedbackText>}
		</TextInputContainer>
	)
}

const CopyButtonContainer = styled.TouchableOpacity`
	flexDirection: column;
	alignItems: center;
	justifyContent: center;
	width: 74px;
	height: 40px;
	borderRadius: 6px;
	backgroundColor: #EDF2F7;
`;

const CopyButton = (props) => {
	const iconToShow = props.copied ? "checkmark-circle" : "md-copy";
	const sizeOfIcon = props.copied ? 25 : 20;

	return (
	<CopyButtonContainer onPress={props.onPress}>
		<Ionicons name={iconToShow} size={sizeOfIcon} />
	</CopyButtonContainer>
	)
}



const ReferralCodeContainer = styled.View`
	flexDirection: row;
	alignItems: center;
	justifyContent: center;
	width: 351px;
`;

export const ReferralCode = (props) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		setCopied(true);
		setTimeout(() => setCopied(false), 1000);
	}

	return (
		<Container>
			<LabelText>Your referral code</LabelText>
			<ReferralCodeContainer>
				<TextInput
				value={"E53DHY"}
				copied={copied}
				/>
				<CopyButton 
				onPress={handleCopy}
				copied={copied}
				/>
			</ReferralCodeContainer>
			{copied && <FeedbackText>copied!</FeedbackText>}
		</Container>
	)
}