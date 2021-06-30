import React from 'react';
import styled from 'styled-components';
import { MediumComponentContainer as ParentContainer } from '../_atoms/Container';
import { Header } from '../_molecules/Header';
import { Image } from 'react-native-ui-lib';

const MediumComponentContainer = styled(ParentContainer)`
	flexDirection: row;
	borderWidth: 1px;
	backgroundColor: #FFFFFF; 
	borderColor: #E6F2FC;
	alignItems: center;
	justifyContent: flex-start;
	marginTop: 20px;
	marginBottom: 20px;
`;

export const AccountPanel = (props) => {
	return (
	<MediumComponentContainer>
		<Image 
		source={require('../../assets/user.png')}
		style={{ height: 50, width: 50, marginLeft: 30, marginRight: 33}}
		/>

		<Header
		headerText={props.firstName + " " + props.lastName}
		subheaderText={props.username}
		containerStyle={{ marginTop: 0, marginBottom: 0, alignItems: "flex-start" }}
		/>
	</MediumComponentContainer>
	)
}