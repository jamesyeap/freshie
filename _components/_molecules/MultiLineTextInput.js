import { Center } from '@chakra-ui/react';
import React from 'react'
import { View } from 'react-native'
import { RegularText, MediumText } from '../_atoms/Text';
import { TextArea } from 'react-native-ui-lib'
import styled from 'styled-components'

const Container = styled.View`
    flexDirection: column;
    minHeight: 100px;
    alignItems: flex-start;
    justifyContent: center;
    marginLeft: 18px;
    marginRight: 18px;
    marginTop: 9px;
`;

export const TextContainer = styled(View)`
    borderWidth: 1px;
    borderRadius: 6px;
    borderColor: #E2E8F0;
    minHeight: 40px;
    width: 320px;
    flex: 1;
    flexDirection: row;
    justifyContent: center;
    alignSelf: center;
    paddingTop: 2.5px;
    paddingBottom: 8px;
    paddingLeft: 8px;
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

export const MultiLineTextInput = (props) => {
    return (
        <Container>
            {props.label && <InputLabelText>{props.label}</InputLabelText>}
            <TextContainer marginTop= {props.marginTop}>
                <TextArea placeholderTextColor= "#B9BBBE" placeholder= {props.placeholder} style={{fontFamily: "Inter_400Regular"}}>
                    {props.text}
                </TextArea>
            </TextContainer>
        </Container>
    )
}
