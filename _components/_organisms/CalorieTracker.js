import React from 'react';
import styled from 'styled-components';
import { BigComponentContainer } from '../_atoms/Container';
import { Info } from '../_molecules/Info';

const Container = styled(BigComponentContainer)`
	backgroundColor: #F4F4F4;
	padding: 17px;
`;

export const InfoRowContainer = styled.View`
	flexDirection: row;
	justifyContent: space-around;
	alignItems: center;
`;

const CaloriesEatenInfo = (props) => {
	return (<Info
		label="Eaten"
		value={500}
		unit="kcal"
		/>)
}

const CaloriesLeftInfo = (props) => {
	return (<Info
		label="Left"
		value={2500}
		unit="kcal"
		/>)
}

export const CalorieTracker = (props) => {
	return (
		<Container>
			<InfoRowContainer>
				<CaloriesEatenInfo />
				<CaloriesLeftInfo />
			</InfoRowContainer>
		</Container>
	)
}
