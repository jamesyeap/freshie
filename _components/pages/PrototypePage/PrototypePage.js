import React from 'react';
import styled from 'styled-components';
import { Container } from '../../_atoms/Container';

/* Insert Components To Preview Here  */
import { Info } from '../../_molecules/Info';
import { CalorieTracker } from '../../_organisms/CalorieTracker';

export default function PrototypePage(props) {
	return (
		<Container>
			<Info
			label="Test"
			value="500"
			unit="kcal" 
			/>
			<CalorieTracker />
		</Container>
	)
}
