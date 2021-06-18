import { Center } from '@chakra-ui/react';
import React from 'react'
import { View } from 'react-native'
import { TextArea } from 'react-native-ui-lib'
import styled from 'styled-components'

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
    marginTop: ${props => props.marginTop ? props.marginTop : 0}
    
`;

export const MultiLineTextInput = (props) => {
    return (
        <TextContainer marginTop= {props.marginTop}>
            <TextArea placeholderTextColor= "#B9BBBE" placeholder= {props.placeholder} style={{fontFamily: "Inter_400Regular"}}>
                {props.text}
            </TextArea>
        </TextContainer>
    )
}