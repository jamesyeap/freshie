import React from 'react';
import styled from 'styled-components';
import { MediumComponentContainer as ParentContainer } from '../_atoms/Container';
import { Info } from '../_molecules/Info';

const InfoRowContainer = styled.View`
	flexDirection: row;
	alignItems: baseline;
	justifyContent: space-between;
	width: 191px;
	margin: 12.14px;
`;

// made the height slightly taller to accommodate content
const MediumComponentContainer = styled(ParentContainer)`
	flexDirection: column;
	alignItems: center;
	justifyContent: center;
	backgroundColor: ${props => props.backgroundColor ? props.backgroundColor : "#F4F4F4"}
	height: 160px;
	marginTop: 6px;
	marginBottom: 12px;
`;

export const InfoPanel = ({infoOne, infoTwo, infoThree, infoFour, ...props}) => {
	return (
	<MediumComponentContainer backgroundColor={props.backgroundColor} >
		<InfoRowContainer>
			{infoOne &&
				<Info
				label={infoOne.label}
				value={infoOne.value}
				unit={infoOne.unit}
				/>
			}

			{infoTwo &&
				<Info
				label={infoTwo.label}
				value={infoTwo.value}
				unit={infoTwo.unit}
				/>
			}
		</InfoRowContainer>

		<InfoRowContainer>
			{infoThree &&
				<Info
				label={infoThree.label}
				value={infoThree.value}
				unit={infoThree.unit}
				/>
			}

			{infoFour &&
				<Info
				label={infoFour.label}
				value={infoFour.value}
				unit={infoFour.unit}
				/>
			}
		</InfoRowContainer>
	</MediumComponentContainer>
	)
}