import React from 'react';
import styled from 'styled-components';
import { Container as ParentContainer } from '../../_atoms/Container';
import { IconButton } from '../../_atoms/Button';
import { Header } from '../../_molecules/Header';
import { NavigationHeader } from '../../_molecules/NavigationHeader';
import { Ionicons } from '@expo/vector-icons';
import { EatenMealsSection } from '../../_organisms/EatenMealsSection';

const Container = styled(ParentContainer)`
	backgroundColor: #CCD7E0;
`;

const HeaderContainer = styled.TouchableOpacity`
	flexDirection: row;
	justifyContent: flex-start;
	alignItems: center;
	width: 310px;
	height: 80px;
	borderRadius: 10px;
	backgroundColor: #E3eff9;
	marginTop: 20px;
`;

export default function EatingHistoryPage(props) {
	return (
		<Container>
			<NavigationHeader />
			<HeaderContainer>
				<Ionicons
				name="md-calendar"
				size={30}
				style={{ marginLeft: 20, marginRight: 10 }}
				color="#7db0dd"
				/>
				<Header
				containerStyle={{ alignItems: "flex-start", marginTop: 0, marginBottom: 0, marginLeft: 10 }}
				headerText="Sunday"
				subheaderText="17 January 2021"
				/>
			</HeaderContainer>

			<EatenMealsSection />
		</Container>
	)
}
