import React from 'react';
import styled from 'styled-components';

import { HeaderMediumText, SubHeaderText } from '../_atoms/Text';

const Container = styled.View`
	flexDirection: column;
	alignItems: center;
	justifyContent: center;
	marginTop: 77px;
	marginBottom: 31px;
`;

export const Header = ({containerStyle, headerText, headerStyle, subheaderText, subHeaderStyle,...props}) => {
	return (
		<Container style={containerStyle}>
			<HeaderMediumText style={headerStyle}>{headerText}</HeaderMediumText>
			{subheaderText && <SubHeaderText style={subHeaderStyle} >{subheaderText}</SubHeaderText>}
		</Container>
	)
}