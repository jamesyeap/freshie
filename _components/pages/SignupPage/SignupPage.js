import React from 'react'
import styled from 'styled-components'
import { Image } from 'react-native-ui-lib'
import { Container } from '../../_atoms/Container'
import { BrandHeaderText, MediumText } from '../../_atoms/Text'
import { Header as ParentHeader } from '../../_molecules/Header'
import { BigButton, TextButton } from '../../_atoms/Button'

const HeaderContainer = styled.View`
    marginLeft: 21px;
    marginRight: 21px;
`;
const Header = styled(ParentHeader)`
    textAlign: center;
`;

const Icon = () => <Image source= {require('../../../assets/signuppageicon.png')} 
style={{width: 200, height: 200, marginTop:77}}/>

const YesButton = (props) => <BigButton label="Yep!" onPress= {props.onPress} />

const NoButton = (props) => <BigButton marginTop= "20px" onPress= {props.onPress} label="Nope!" />

export default function SignupPage(props) {
    return (
        <Container>
            <BrandHeaderText>freshie</BrandHeaderText>
            <Icon/>
            <HeaderContainer>
                <Header headerText="Are you registering as a personal trainer?"></Header>
            </HeaderContainer>
            <YesButton onPress={ () => props.navigation.push("Register", {isPersonalTrainer: true})}/>
            <NoButton onPress={ () => props.navigation.push("Register", {isPersonalTrainer: false})}/>
            <TextButton style= {{marginTop: 150}} label="Back to Login" buttonStyle={{ marginTop: 20 }} ></TextButton>
        </Container>
    )
}

