import React from 'react';
import styled from 'styled-components';
import { Container } from '../../../_atoms/Container';
import { NavigationHeader } from '../../../_molecules/NavigationHeader';
import { HeaderMediumText } from '../../../_atoms/Text';
import { BigButton } from '../../../_atoms/Button';
import ReferralCode from '../../../_molecules/ReferralCode';
import { connect, useDispatch } from 'react-redux';
import { logoutAsync_API } from '../../../../_redux/actions/Auth.actions';

const NameText = styled(HeaderMediumText)`
	textAlign: left;
	marginTop: 19px;
	marginBottom: 19px;
	marginLeft: 41px;
	marginRight: auto;
	flexWrap: wrap;
	alignSelf: flex-start;
`;

function mapStateToProps(state) {
	const { username, firstName, lastName, email } = state.auth;
	return { username, firstName, lastName, email };
}

export function TrainerAccountPage(props) {
	const dispatch = useDispatch()
	
	return (
		<Container>
			<NavigationHeader goTo={() => props.navigation.goBack()} />
			<NameText>{props.firstName + " " + props.lastName}</NameText>

			<ReferralCode
			/>

			<BigButton
			label="Log Out"
			buttonStyle={{ marginTop: 15, backgroundColor: "#D53F8C" }}
			onPress={() => dispatch(logoutAsync_API())}
			/>
		</Container>
	)
}

export default connect(mapStateToProps)(TrainerAccountPage);

