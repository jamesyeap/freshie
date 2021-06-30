import React from 'react';
import styled from 'styled-components';
import { MediumText } from '../_atoms/Text';
import DateTimeComponent from '@react-native-community/datetimepicker';

const Container = styled.View`
	flexDirection: column;
	justifyContent: center;
	margin: 18px;
	marginTop: ${props => props.stacked ? props.stacked : "18px"};
`;

export const LabelText = styled(MediumText)`
	fontSize: 16px;
	lineHeight: 24px;
	color: #2D3748;
	marginBottom: 8px;
`;

export const DateTimePicker = ({ date, setDate, label,...props}) => {
	return (
		<Container>
			{label && <LabelText>{label}</LabelText>}

			<DateTimeComponent
			testID="dateTimePicker"
			value={date}
			mode={'date'}
			is24Hour={true}
			display="default"
			onChange={(event, selectedDate) => { 
				const currentDate = selectedDate || date;
				setDate(currentDate);
			}}
			/>
		</Container>
	)
}