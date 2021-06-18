import React from 'react';
import styled from 'styled-components';
import { MediumComponentContainer as ParentContainer } from '../_atoms/Container';
import { IconButton } from '../_atoms/Button';
import { Info } from '../_molecules/Info';

// made the height slightly taller to accommodate content
const MediumComponentContainer = styled(ParentContainer)`
	flexDirection: row;
	alignItems: center;
	justifyContent: space-evenly;
	backgroundColor: #E3FF92;
	marginTop: 6px;
	marginBottom: 12px;
	minHeight: 150px;
	padding: 20px;
	paddingLeft: 40px;
`;

const ButtonGroup = styled.View`
	flexDirection: column;
	justifyContent: flex-end;
	alignItems: flex-end;
	marginLeft: auto;
	marginRight: 15px;
`;

export const TrainerPanel = (props) => {
	return (
		<MediumComponentContainer>
			<Info 
			label="Your Trainer"
			labelColor="#B1CD61"
			value="Lee Ah Kow"
			/>

			<ButtonGroup>
				<IconButton iconName="call" buttonLabel="Call" buttonStyle={{ width: 90, margin: 5 }}/>
				<IconButton iconName="chatbox-ellipses" buttonLabel="Chat" buttonStyle={{ width: 90, margin: 5 }} />
				<IconButton iconName="md-mail" buttonLabel="Email" buttonStyle={{ width: 90, margin: 5 }} />
			</ButtonGroup>
		</MediumComponentContainer>
	)
}