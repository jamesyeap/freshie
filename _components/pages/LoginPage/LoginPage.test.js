import React from 'react'
import { Provider } from 'react-redux';
import { store } from '../../../_redux/store/store'
import { render, screen, fireEvent } from '@testing-library/react-native';
import 'jest-styled-components'

import LoginPage from './LoginPage'

const setup = () => {
	const utils = render(
		<Provider store={store}>
			<LoginPage />
		</Provider>
	)

	return utils;
}

test('user can key in username and password', () => {
	const { getByLabelText, getByTestId } = render(
		<Provider store={store}>
			<LoginPage />
		</Provider>
	)

	const usernameInput = getByTestId('username-input')
	const fakeUsernameText = 'mark'
	fireEvent.changeText(usernameInput, fakeUsernameText)
	console.log(usernameInput.value)

})

