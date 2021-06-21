import React from 'react';
import styled from 'styled-components';
import { Container } from '../../_atoms/Container';
import { BrandHeaderText } from '../../_atoms/Text';
import { Header } from '../../_molecules/Header';
import { TextInput } from '../../_molecules/TextInput';
import { BigButton, TextButton, Checkbox } from '../../_atoms/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { store } from '../../../_redux/store/store';
import { saveToken } from '../../../_redux/actions/Auth.actions';

const OptionsContainer = styled.View`
	flexDirection: row;
	justifyContent: space-between;
	alignItems: center;
	width: 300px;
	margin: 12px;
`;

const LoginSchema = Yup.object().shape({
	email : Yup.string()
		   .email('nice what kind of email is this')
		   .required('hello sir your email is required hor.'),
	password: Yup.string()
		     .required('nice one no password then how to secure sia')

})

export default function LoginPage(props) {

	const handleLogin = () => {
		console.log(store.getState().token);
		store.dispatch(saveToken("Hello Worldyszzz"));
		console.log(store.getState().token);
	}

	return (
		<Formik
		 initialValues={{ email: '', password: '' }}
		 validationSchema={LoginSchema}
		 onSubmit={handleLogin}
		>
		{({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
		<Container>
			<BrandHeaderText>freshie</BrandHeaderText>
			<Header
			 headerText="Hello, Welcome Back"
			 subheaderText="Enter your credentials to continue"
			/>

			<TextInput
			label="Email Address"
			placeholder="jack@email.com"
			onChangeText={handleChange('email')}
			onBlur={handleBlur('email')}
			value={values.email}
			feedbackMessage={errors.email}
			touched={touched.email}
			/>

			<TextInput
			label="Password"
			onChangeText={handleChange('password')}
			onBlur={handleBlur('password')}
			value={values.password}
			feedbackMessage={errors.password}
			touched={touched.password}
			secureTextEntry
			/>

			<OptionsContainer>
				<Checkbox label="Remember me"/>
				<TextButton label="Forgot Password?" />
			</OptionsContainer>

			{/* <BigButton label="Sign In" state="active" onPress={() => props.navigation.push("Client")}/> */}
			<BigButton label="Sign In" state="active" onPress={handleLogin}/>

			<TextButton label="Don't have an account?" onPress={() => props.navigation.push("Register")} buttonStyle={{ marginTop: 20 }} />
		</Container>
		)}
		</Formik>
	)
}