import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { ClientItem } from '../../../_molecules/ClientItem';
import { deleteClient_API } from '../../../../_utilities/_api/Trainer';
import { ClientsButtonModal } from './ClientsButtonModal';
import { getClients_API } from '../../../../_utilities/_api/Trainer'

function mapStateToProps(state) {
	const { clients } = state.trainer;
	return { clients };
}

export function ClientsDashboardSection(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedClient, setSelectedClient] = useState(null);
	const [refreshing, setRefreshing] = useState(false);

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

	const handleRefresh = () => {
		setRefreshing(true);
		getClients_API();
		setRefreshing(false);
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
		data={props.data}
		renderItem={({ item }) => <ClientItem key={item.id.toString()} clientDetails={item} onPress={() => handleSelect(item)} />}
		style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
		contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		keyExtractor={(item) => item.id.toString()}
		refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
		/>
		

		</>
	)
}

export default connect(mapStateToProps)(ClientsDashboardSection);
