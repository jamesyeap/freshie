import React from 'react';
import { render } from '@testing-library/react-native';
import { SemiBoldText } from '../_components/_atoms/Text';

describe('Semi Bold Text', () => {
	it('renders', () => {
		const {getByText} = render(<SemiBoldText>Hello</SemiBoldText>)
		expect(getByText('Hello')).not.toBeNull()
	})
})