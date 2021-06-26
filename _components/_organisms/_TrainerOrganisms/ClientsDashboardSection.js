import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { BigButton } from '../../_atoms/Button';
import { ClientItem } from '../../_molecules/ClientItem';
import { getClients_API } from '../../../_utilities/_api/Trainer';
import { store } from '../../../_redux/store/store';

/* NEEDS FIXING -> clients attribute here is undefined for some reason */
function mapStateToProps(state) {
	const { clients } = state.trainer;
	return { clients };
}

export function ClientsDashboardSection(props) {
	// using "store.getState() below temporarily instead."
	return (
		<FlatList
		 data={store.getState().trainer.clients}
		 renderItem={({ item }) => <ClientItem clientDetails={item} onPress={() => props.navigation.push("Client", {clientDetails: item })} />}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		 keyExtractor={(item) => item.id.toString()}
		/>
	)
}

export default connect(mapStateToProps)(ClientsDashboardSection);
