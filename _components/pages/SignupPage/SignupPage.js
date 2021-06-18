import React from 'react'
import styled from 'styled-components'
import { Image } from 'react-native-ui-lib'
import { Container } from '../../_atoms/Container'
import { BrandHeaderText, MediumText } from '../../_atoms/Text'
import { Header as ParentHeader } from '../../_molecules/Header'
import { BigButton, TextButton } from '../../_atoms/Button'

const HeaderContainer = styled.View`
    marginLeft: 21;
    marginRight: 21;
`;
const Header = styled(ParentHeader)`
    textAlign: center;
`;

const Icon = () => <Image source= {require('../../../assets/signuppageicon.png')} 
style={{width: 200, height: 200, marginTop:77}}/>

const YesButton = () => <BigButton label="Yep!"/>

const NoButton = () => <BigButton marginTop= "20px" label="Nope!"/>

export default function SignupPage(props) {
    return (
        <Container>
            <BrandHeaderText>freshie</BrandHeaderText>
            <Icon/>
            <HeaderContainer>
                <Header headerText="Are you registering as a personal trainer?"></Header>
            </HeaderContainer>
            <YesButton/>
            <NoButton/>
            <TextButton style= {{marginTop: 150}} label="Back to Login"></TextButton>
        </Container>
    )
}

