import React from 'react';
import styled from 'styled-components';
import { RegularText, SemiBoldText } from '../_atoms/Text';

const Container = styled.View``;

const ValuesContainer = styled.View`
	flexDirection: row;
	justifyContent: space-between;
	alignItems: center;
	width: 50px;
`;

export const InfoLabelText = styled(SemiBoldText)`
	fontSize: 14;
	lineHeight: 20;
	color: #9E8D8D;
`;

export const InfoValueText = styled(SemiBoldText)`
	fontSize: 16;
	lineHeight: 24;
	color: #000000;
`;

export const InfoUnitText = styled(RegularText)`
	fontSize: 12;
	lineHeight: 16;
	color: #9E8D8D
`;

export const Info = ({label, value, unit, ...props}) => {
	return (
		<Container>
			<InfoLabelText>{label}</InfoLabelText>	
			<ValuesContainer>
				<InfoValueText>{value}</InfoValueText>
				<InfoUnitText>{unit}</InfoUnitText>
			</ValuesContainer>	
		</Container>
	);
}

