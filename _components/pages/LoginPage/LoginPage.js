import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import { Container } from '../../_atoms/Container';
import { BrandHeaderText } from '../../_atoms/Text';
import { Header } from '../../_molecules/Header';
import { TextInput } from '../../_molecules/TextInput';
import { BigButton, TextButton, Checkbox } from '../../_atoms/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { loginAsync_API, acknowledge } from '../../../_redux/actions/Auth.actions';
import { connect, useDispatch } from 'react-redux';
import { Snackbar } from 'react-native-paper';

const OptionsContainer = styled.View`
	flexDirection: row;
	justifyContent: space-between;
	alignItems: center;
	width: 300px;
	margin: 12px;
`;

const LoginSchema = Yup.object().shape({
	username: Yup.string()
		   .required('Email is required!'),
	password: Yup.string()
		     .required('Please enter a password!')

})

function mapStateToProps(state) {
	const { loading, error } = state.auth;
	return { loading, error };
}

function LoginPage(props) {
	const dispatch = useDispatch();

	const handleLogin = (values) => {
		dispatch(loginAsync_API(values));
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

			<BigButton label="Sign In" state="active" onPress={handleSubmit}/>

			<TextButton label="Don't have an account?" onPress={() => props.navigation.push("Signup")} buttonStyle={{ marginTop: 20 }}/>

			<Snackbar style={{ backgroundColor: "#60A5FA", marginBottom: 40 }} visible={props.loading}>Loading</Snackbar>
			<Snackbar 
			 style={{ backgroundColor: "#F87171", marginBottom: 40 }}
			 visible={props.error}
			 onDismiss={() => dispatch(acknowledge())}
			 action={{
			 label: 'ok',
			 onPress: () => {
				dispatch(acknowledge())
			 	}
			 }}
			>
				{props.error}
			</Snackbar>
			
		</Container>
		)}
		</Formik>
	)
}

export default connect(mapStateToProps)(LoginPage);