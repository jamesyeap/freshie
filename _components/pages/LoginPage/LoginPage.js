import React from 'react';
import styled from 'styled-components';
import { Container } from '../../_atoms/Container';
import { BrandHeaderText } from '../../_atoms/Text';
import { Header } from '../../_molecules/Header';
import { TextInput } from '../../_molecules/TextInput';
import { BigButton, TextButton, Checkbox } from '../../_atoms/Button';

const OptionsContainer = styled.View`
	flexDirection: row;
	justifyContent: space-between;
	alignItems: center;
	width: 300px;
	margin: 12px;
`;

export default function LoginPage(props) {
	return (
		<Container>
			<BrandHeaderText>freshie</BrandHeaderText>
			<Header
			 headerText="Hello, Welcome Back"
			 subheaderText="Enter your credentials to continue"
			/>

			<TextInput
			label="Email Address"
			feedbackMessage="Must be a valid email"
			value={"test"}
			/>

			<TextInput
			label="Password"
			feedbackMessage="Password is required"
			value={"test"}
			/>

			<OptionsContainer>
				<Checkbox label="Remember me"/>
				<TextButton label="Forgot Password?" />
			</OptionsContainer>

			<BigButton label="Sign In" state="default" />

			<TextButton label="Don't have an account?"/>
		</Container>
	)
}