import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Container as ParentContainer } from '../../_atoms/Container';
import { Header } from '../../_molecules/Header';
import { NavigationHeader } from '../../_molecules/NavigationHeader';
import { Ionicons } from '@expo/vector-icons';
import EatenMealsSection from '../../_organisms/EatenMealsSection/EatenMealsSection';
import { prettifyDate } from '../../../_utilities/_helperFunctions/prettifyDate';
import { getDay } from '../../../_utilities/_helperFunctions/getDay';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getConsumedMeals_API } from '../../../_redux/actions/Client.actions';
import { Snackbar } from 'react-native-paper';
import { acknowledge } from '../../../_redux/actions/Client.actions';

const Container = styled(ParentContainer)`
	backgroundColor: #CCD7E0;
`;

const HeaderContainer = styled.TouchableOpacity`
	flexDirection: row;
	justifyContent: flex-start;
	alignItems: center;
	width: 310px;
	height: 80px;
	borderRadius: 10px;
	backgroundColor: #E3eff9;
	marginTop: 20px;
`;

/* NOTE: FORMAT TO USE WHEN QUERYING SERVER: 
	DD-MM-YYYY 
*/

export default function EatingHistoryPage(props) {
	const [date, setDate] = useState(new Date());
	const [dateHeader, setDateHeader] = useState();
	const [day, setDay] = useState();
	const [showDatePicker, setShowDatePicker] = useState(false);
	const { loading, error } = useSelector(state => state.client);
	const dispatch = useDispatch();

	const handleConfirm = (newDate) => {
		//let correctDate = correctTimeZone(newDate)
		setDate(newDate);
		setDateHeader(prettifyDate(newDate));
		setDay(getDay(newDate));
		//console.log(newDate)
		//console.log(newerDate)
		setShowDatePicker(false);
		const dateArgument = {
			day: newDate.getDate(),
			month: newDate.getMonth() + 1,
			year: newDate.getFullYear()
		}
		dispatch(getConsumedMeals_API({ dateArgument: dateArgument, searchOnly: true }))
	}

	useEffect(() => {
		setDay(getDay(date));
		setDateHeader(prettifyDate(date));
	}, [date, day, dateHeader])


	return (
		<Container>
			<NavigationHeader goTo={() => props.navigation.goBack()} />
			<HeaderContainer onPress={() => setShowDatePicker(true)}>
				<Ionicons
				name="md-calendar"
				size={30}
				style={{ marginLeft: 20, marginRight: 10 }}
				color="#7db0dd"
				/>
				<Header
				containerStyle={{ alignItems: "flex-start", marginTop: 0, marginBottom: 0, marginLeft: 10 }}
				headerText={day}
				subheaderText={dateHeader}
				/>
			</HeaderContainer>

			<DateTimePickerModal
			isVisible={showDatePicker}
			mode="date"
			onConfirm={handleConfirm}
			onCancel={() => setShowDatePicker(false)}
			isDarkModeEnabled={false}
			display="spinner"
			themeVariant="light"
			textColor="black"
			date={date}
			/>

			<EatenMealsSection navigation={props.navigation} />

			<Snackbar style={{ backgroundColor: "#60A5FA", marginBottom: 40 }} visible={loading}>Loading</Snackbar>
			<Snackbar 
			 style={{ backgroundColor: "#F87171", marginBottom: 40 }}
			 visible={error}
			 onDismiss={() => dispatch(acknowledge())}
			 action={{
			 label: 'ok',
			 onPress: () => {
				dispatch(acknowledge())
			 	}
			 }}
			>
				{error}
			</Snackbar>
		</Container>
	)
}
