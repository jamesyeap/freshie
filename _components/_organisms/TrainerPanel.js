import React, { useState } from 'react';
import styled from 'styled-components';
import { MediumComponentContainer as ParentContainer } from '../_atoms/Container';
import { TextInput } from '../_molecules/TextInput';
import { MediumButton } from '../_atoms/Button';
import { useSelector, useDispatch } from 'react-redux';
import { addPersonalTrainer_API } from '../../_redux/actions/Client.actions'
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

const ReferralCodeContainer = styled.View`
	flexDirection: column;
	justifyContent: center;
	alignItems: center;
	width: 150px;
	
`

export const TrainerPanel = (props) => {
	const { personalTrainer } = useSelector(state => state.client)
	const [referralCode, setReferralCode] = useState("");
	const dispatch = useDispatch();

	return (
		<MediumComponentContainer style={props.style}>
			<Info 
			label="Your Trainer"
			labelColor="#B1CD61"
			value={personalTrainer ? personalTrainer : "No Trainer"}
			/>

			{personalTrainer  
				? (<ButtonGroup>
					<IconButton iconName="call" buttonLabel="Call" buttonStyle={{ width: 90, margin: 5, backgroundColor: "#319795" }}/>
					<IconButton iconName="chatbox-ellipses" buttonLabel="Chat" buttonStyle={{ width: 90, margin: 5, backgroundColor: "#319795" }} />
					<IconButton iconName="md-mail" buttonLabel="Email" buttonStyle={{ width: 90, margin: 5, backgroundColor: "#319795" }} />
				</ButtonGroup>)
				: (
					<ReferralCodeContainer>
						<TextInput 
							value={referralCode} 
							onChangeText={setReferralCode} 
							inputStyle={{ width: 150 }} 
							placeholder="referralCode"
						/>
						<MediumButton 
							label={"Add Trainer"} 
							onPress={() => dispatch(addPersonalTrainer_API(referralCode))} 
							buttonStyle={{ backgroundColor: "#60A5FA" }}
						/>
					</ReferralCodeContainer>
				)
			}
		</MediumComponentContainer>
	)
}