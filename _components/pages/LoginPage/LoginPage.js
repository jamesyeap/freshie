import React from 'react';
import styled from 'styled-components';
import { Container } from '../../_atoms/Container';
import { BrandHeaderText } from '../../_atoms/Text';
import { Header } from '../../_molecules/Header';
import { TextInput } from '../../_molecules/TextInput';
import { BigButton, TextButton, Checkbox } from '../../_atoms/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { loginAsync } from '../../../_utilities/_api/Auth';

const OptionsContainer = styled.View`
	flexDirection: row;
	justifyContent: space-between;
	alignItems: center;
	width: 300px;
	margin: 12px;
`;

const LoginSchema = Yup.object().shape({
	username: Yup.string()
		   .required('hello sir your email is required hor.'),
	password: Yup.string()
		     .required('nice one no password then how to secure sia')

})

export default function LoginPage(props) {

	const handleLogin = (values) => {
		console.log(values);
		loginAsync(values);
	}

	return (
		<Formik
		 initialValues={{ username: '', password: '' }}
		 validationSchema={LoginSchema}
		 onSubmit={values => handleLogin(values)}
		>
		{({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
		<Container>
			<BrandHeaderText>freshie</BrandHeaderText>
			<Header
			 headerText="Hello, Welcome Back"
			 subheaderText="Enter your credentials to continue"
			/>

			<TextInput
			label="Username"
			placeholder="ahBengWithBang"
			onChangeText={handleChange('username')}
			onBlur={handleBlur('username')}
			value={values.username}
			feedbackMessage={errors.username}
			touched={touched.username}
			autoCapitalize="none"
			/>

			<TextInput
			label="Password"
			onChangeText={handleChange('password')}
			onBlur={handleBlur('password')}
			value={values.password}
			feedbackMessage={errors.password}
			touched={touched.password}
			autoCapitalize="none"
			secureTextEntry
			/>

			<OptionsContainer>
				<Checkbox label="Remember me"/>
				<TextButton label="Forgot Password?" />
			</OptionsContainer>

			{/* <BigButton label="Sign In" state="active" onPress={() => props.navigation.push("Client")}/> */}
			<BigButton label="Sign In" state="active" onPress={handleSubmit}/>

			<TextButton label="Don't have an account?" onPress={() => props.navigation.push("Signup")}/>
		</Container>
		)}
		</Formik>
	)
}