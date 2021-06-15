import React from 'react';
import styled from 'styled-components';

import { HeaderMediumText, SubHeaderText } from '../_atoms/Text';

const Container = styled.View`
	flexDirection: column;
	alignItems: center;
	justifyContent: center;
	marginTop: 77;
	marginBottom: 31;
`;

export const Header = ({headerText, subheaderText,...props}) => {
	return (
		<Container>
			<HeaderMediumText>{headerText}</HeaderMediumText>
			{subheaderText && <SubHeaderText>{subheaderText}</SubHeaderText>}
		</Container>
	)
}