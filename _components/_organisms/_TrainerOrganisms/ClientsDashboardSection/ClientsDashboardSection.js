import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { ClientItem } from '../../../_molecules/ClientItem';
import { getClients_API, deleteClient_API } from '../../../../_redux/actions/Trainer.actions';
import { ClientsButtonModal } from './ClientsButtonModal';

function mapStateToProps(state) {
	const { clients } = state.trainer;
	return { clients };
}

export function ClientsDashboardSection(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedClient, setSelectedClient] = useState(null);
	const [refreshing, setRefreshing] = useState(false);

	const dispatch = useDispatch();

	const handleSelect = (clientDetails) => {
		setSelectedClient(clientDetails);
		setModalVisible(true);
	}

	const handleView = () => {
		props.navigation.push("Client", { clientDetails: selectedClient })
	}

	const handleDelete = () => {
		dispatch(deleteClient_API(selectedClient.username))
	}

	const handleClose = () => {
		setSelectedClient(null);
		setModalVisible(false);
	}

	const handleRefresh = () => {
		setRefreshing(true);
		dispatch(getClients_API());
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

		{	(props.data !== "You do not have any clients!") && 
				(<FlatList
				data={props.data}
				renderItem={({ item }) => <ClientItem key={item.id.toString()} clientDetails={item} onPress={() => handleSelect(item)} />}
				keyExtractor={(item) => item.id.toString()}
				style={{ backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 }}
				contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
				/>)
		}
		</>
	)
}

export default connect(mapStateToProps)(ClientsDashboardSection);
