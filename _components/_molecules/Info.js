import React from 'react';
import styled from 'styled-components';
import { RegularText, SemiBoldText } from '../_atoms/Text';

const Container = styled.View`
	width: 120px;
`;

const ValuesContainer = styled.View`
	flexDirection: row;
	justifyContent: flex-start;
	alignItems: center;
`;

export const InfoLabelText = styled(SemiBoldText)`
	fontSize: 14px;
	lineHeight: 20px;
	color: ${props => props.labelColor ? props.labelColor : "#9E8D8D"};
	flexWrap: wrap;
`;

export const InfoValueText = styled(SemiBoldText)`
	fontSize: 16px;
	lineHeight: 24px;
	color: ${props => props.valueColor ? props.valueColor : "#000000"};
	flexWrap: wrap;
`;

export const InfoUnitText = styled(RegularText)`
	fontSize: 12px;
	lineHeight: 16px;
	color: ${props => props.unitColor ? props.unitColor : "#9E8D8D"};
	marginLeft: 1.5px;
	marginTop: 3px;
	flexWrap: wrap;
`;

export const Info = ({label, value, unit, labelColor, valueColor, unitColor, ...props}) => {
	return (
		<Container>
			{label && <InfoLabelText labelColor={labelColor} >{label}</InfoLabelText>}	
			<ValuesContainer>
				<InfoValueText valueColor={valueColor} >{value}</InfoValueText>
				<InfoUnitText unitColor={unitColor} >{unit}</InfoUnitText>
			</ValuesContainer>	
		</Container>
	);
}

