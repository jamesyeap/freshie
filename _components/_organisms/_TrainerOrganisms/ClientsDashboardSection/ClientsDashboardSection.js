import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { BigButton } from '../../../_atoms/Button';
import { ClientItem } from '../../../_molecules/ClientItem';
import { getClients_API, deleteClient_API } from '../../../../_utilities/_api/Trainer';
import { store } from '../../../../_redux/store/store';
import { ClientsButtonModal } from './ClientsButtonModal';

function mapStateToProps(state) {
	const trainerState = state.trainer;
	return trainerState;
}

export function ClientsDashboardSection(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedClient, setSelectedClient] = useState(null);

	const handleSelect = (clientDetails) => {
		setSelectedClient(clientDetails);
		setModalVisible(true);
	}

	const handleView = () => {
		props.navigation.push("Client", { clientDetails: selectedClient })
	}

	const handleDelete = () => {
		deleteClient_API(selectedClient.username)
	}

	const handleClose = () => {
		setSelectedClient(null);
		setModalVisible(false);
	}

	return (
		<>
		{modalVisible && <ClientsButtonModal 
		modalVisible={modalVisible}
		handleClose={handleClose}
		itemDetails={selectedClient}
		handleView={handleView}
		handleDelete={handleDelete}
		/>}

		<FlatList
		 data={store.getState().trainer.clients}
		 renderItem={({ item }) => <ClientItem key={item.id.toString()} clientDetails={item} onPress={() => handleSelect(item)} />}
		 style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		 keyExtractor={(item) => item.id.toString()}
		/>

		</>
	)
}

export default connect(mapStateToProps)(ClientsDashboardSection);
