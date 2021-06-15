import React from 'react';
import { BigButton, Checkbox } from "./Button";
import { render, fireEvent } from '@testing-library/react-native';

it(`BigButton renders correctly`, () => {
	const { getByText } = render(<BigButton label="Sign Up">Login</BigButton>);
	const SignUpButton = getByText("Sign Up");

	expect(SignUpButton).not.toBeNull()
      });

 it(`Checkbox renders correctly`, () => {
	const { getByTestId } = render(<Checkbox />);
	const Checkbox = getByTestId("checkbox");

	expect(Checkbox).not.toBeNull()
      });

