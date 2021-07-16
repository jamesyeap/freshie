import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { FoodProduct } from "../../../_redux/reducers/Price.reducer";
import * as WebBrowser from 'expo-web-browser';

export const { height, width } = Dimensions.get('window')

export default function SearchResult(props: FoodProduct) {
	const handleSeeProductAsync = async () => {
		await WebBrowser.openBrowserAsync(props.link);
	}

	const tagNTUC = () => 
		(<View style={{ ...styles.detailsTextContainer, backgroundColor: "#1D4ED8" }}>
			<Text style={{ ...styles.detailsText, color: '#F87171' }}>NTUC FairPrice</Text>
		</View>)
	

	const tagColdStorage = () => 
		(<View style={{ ...styles.detailsTextContainer, backgroundColor: "#FCA5A5" }}>
			<Text style={{ ...styles.detailsText, color: '#1D4ED8' }}>Cold Storage</Text>
		</View>)
	

	const generateSupermarketTag = () => {
		switch(props.supermarket) {
			case "ntuc":
				return tagNTUC()
			case "cold-storage":
				return tagColdStorage()
		}
	}

	return (
		<TouchableOpacity 
			style={styles.container} 
			onPress={handleSeeProductAsync}
		>
			<Text style={styles.titleText}>{props.title}</Text>
			<View style={{ flexDirection: 'column' }}>
				<View style={styles.detailsContainer}>
					<View style={styles.detailsTextContainer}>
						<Text style={styles.detailsText}>${props.price}</Text>
					</View>

					{ (props.measurement !== "") && (<View style={styles.detailsTextContainer}>
						<Text style={styles.detailsText}>{props.measurement}</Text>
					</View>)}
				</View>

				{ generateSupermarketTag() }
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		width: 0.5 * width,
		height: 0.5 * width,
		borderColor: '#E0E7FF',
		borderRadius: 15,
		backgroundColor: '#064E3B',
		padding: 15,
		marginLeft: 5,
	}, 
	titleText: {
		fontFamily: 'Inter_600SemiBold',
		fontSize: 20,
		color: '#D1FAE5',
	},
	detailsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	detailsTextContainer: {
		backgroundColor: '#047857',
		borderRadius: 10,
		padding: 5,
		margin: 5,
	},
	detailsText: {
		fontFamily: 'Inter_500Medium',
		color: '#6EE7B7',
		fontSize: 16,
	}
})