import React from 'react';
import styled from 'styled-components';
import { Container } from '../../_atoms/Container';
import { BrandHeaderText } from '../../_atoms/Text';
import { Header } from '../../_molecules/Header';
import { CalorieTracker } from '../../_organisms/CalorieTracker';

export default function HomePage(props) {
	return (
		<Container>
			<BrandHeaderText>freshie</BrandHeaderText>
			<Header
			headerText="Welcome Home, Ah Beng"
			/>
			<CalorieTracker />
		</Container>
	)
}