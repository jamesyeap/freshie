/*
import React from 'react'
import { Provider } from 'react-redux';
import { store } from '../../../_redux/store/store'
import { render, screen, fireEvent, act, userEvent } from '@testing-library/react-native';
import 'jest-styled-components'

import LoginPage from './LoginPage'

it("should render all components", () => {
	const { 
		getAllByText, 	
		getAllByPlaceholderText, 
		getAllByLabelText,
	} = render(
		<Provider store={store}>
			<LoginPage />
		</Provider>
	)

	expect(getAllByText("Hello, Welcome Back").length).toBe(1)
	expect(getAllByText("Enter your credentials to continue").length).toBe(1)

	expect(getAllByPlaceholderText("enter your username!").length).toBe(1)
	expect(getAllByPlaceholderText("enter your password!").length).toBe(1)
	
	expect(getAllByText("Remember me").length).toBe(1)
	expect(getAllByText("Forgot Password?").length).toBe(1)

	expect(getAllByText("Sign In").length).toBe(1)
	expect(getAllByText("Don't have an account?").length).toBe(1)
})

it("should let user type in username and password", async () => {
	const { 
		queryByText,
		queryByPlaceholderText,
	} = render(
		<Provider store={store}>
			<LoginPage />
		</Provider>
	)

	const usernameTextInput = queryByPlaceholderText("enter your username!")
	const passwordTextInput = queryByPlaceholderText("enter your password!")
	const signInButton = queryByText("Sign In")
	await act(async () => { 
		fireEvent.changeText(usernameTextInput, "bob")
		fireEvent.changeText(passwordTextInput, "jamesjames123")
	})

	expect(usernameTextInput).toHaveProp('value', 'bob')
	expect(passwordTextInput).toHaveProp('value', 'jamesjames123')
})
*/



