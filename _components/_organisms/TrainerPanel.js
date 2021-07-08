import React from 'react';
import styled from 'styled-components';
import { MediumComponentContainer as ParentContainer } from '../_atoms/Container';
import { useSelector } from 'react-redux';
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
	const { personalTrainer } = useSelector(state => state.client)

	return (
		<MediumComponentContainer style={props.style}>
			<Info 
			label="Your Trainer"
			labelColor="#B1CD61"
			value={personalTrainer ? personalTrainer : "No Trainer"}
			/>

			<ButtonGroup>
				<IconButton iconName="call" buttonLabel="Call" buttonStyle={{ width: 90, margin: 5, backgroundColor: "#319795" }}/>
				<IconButton iconName="chatbox-ellipses" buttonLabel="Chat" buttonStyle={{ width: 90, margin: 5, backgroundColor: "#319795" }} />
				<IconButton iconName="md-mail" buttonLabel="Email" buttonStyle={{ width: 90, margin: 5, backgroundColor: "#319795" }} />
			</ButtonGroup>
		</MediumComponentContainer>
	)
}