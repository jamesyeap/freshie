import React from 'react';
import styled from 'styled-components';
import { Container } from '../../_atoms/Container';
import { BrandHeaderText } from '../../_atoms/Text';
import { Header } from '../../_molecules/Header';
import { Portal } from 'react-native-paper';
import { FAB, Provider } from '../../_molecules/FAB';
import { CalorieTracker } from '../../_organisms/CalorieTracker';
import { SectionButton } from '../../_atoms/Button';

export default function HomePage(props) {
	return (
		<Container>
			<BrandHeaderText>freshie</BrandHeaderText>

			<Header
			headerText="Welcome Home, Ah Beng"
			/>

			<CalorieTracker />

			<SectionButton
			mainText="Eating History"
			subText="See what you've been eating"
			margin="21px"
			/>
			
			<FAB />
		</Container>
	
	)
}