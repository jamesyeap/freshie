import React, { useRef } from 'react'
import { View, Animated, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { RegularText, MediumText, HeaderMediumText, SemiBoldText } from '../../_atoms/Text';
import { useSelector, useDispatch } from 'react-redux';
import { InfoPanel } from '../../_organisms/InfoPanel';
import Constants from 'expo-constants';
import { TrainerPanel } from '../../_organisms/TrainerPanel';

const { height, width } = Dimensions.get('window');

export function Header({ scrolling }) {
	const { username } = useSelector(state => state.auth)

	const translation = scrolling.interpolate({
		inputRange: [-height, 0 , height],
		outputRange: [-130, 0, -130],
		extrapolate: 'clamp',
	  })

	 const opacity = scrolling.interpolate({
		inputRange: [-height, 0 , height],
		outputRange: [0, 1, 0],
		extrapolate: 'clamp',
	 })

	return (
		<>
		<Animated.View
			style={{
				...styles.header,
				transform: [
					{ translateY: translation }
				]
			}}
			opacity={opacity}
		>	
			<View style={styles.headerText}>
				<RegularText>More about you!</RegularText>
				<HeaderMediumText style={{ textAlign: 'left' }}>
					{username}!
				</HeaderMediumText>
			</View>
		</Animated.View>
	</>
	)
}

export default function AccountSection({ scrolling }) {
	const { caloriesConsumed, dailyCalories, personalTrainer }  = useSelector(state => state.client)

	return (
		<View style={{ ...styles.wrapper, height: height }} >
			<View style={styles.container}>
			
			<View>
				<SemiBoldText style={{ textAlign: "left", paddingLeft: 40, paddingBottom: 5 }}>
					Your Stats
				</SemiBoldText>

				<ScrollView
					horizontal
					decelerationRate={0}
					snapToInterval={width}
					snapToAlignment="start"
					contentContainerStyle={ styles.biographyScrollView }
					showsHorizontalScrollIndicator={false}
				>
					<InfoPanel 
						labelColor="#60A5FA"
						valueColor="#2563EB"
						unitColor="#60A5FA"
						backgroundColor="#FEF3C7"
						style={styles.infoPanel}

						infoOne={{
						label: "Height",
						value: 180,
						unit: "cm"
						}}
						infoTwo={{
						label: "Age",
						value: 22,
						unit: "years old"
						}}
						infoThree={{
						label: "Weight",
						value: 70,
						unit: "kg"
						}}
						infoFour={{
						label: "Target Weight",
						value: 60,
						unit: "kg"
						}}
					/>

					<InfoPanel
						labelColor="#60A5FA"
						valueColor="#2563EB"
						unitColor="#60A5FA"
						backgroundColor="#DBEAFE"
						style={styles.infoPanel}

						infoOne={{
						label: "BMR",
						value: 180,
						}}
						infoTwo={{
						label: "Activity Level",
						value: "Slightly Active",
						}}
						infoThree={{
						label: "Today's Calories",
						value: caloriesConsumed,
						unit: "kcal"
						}}
						infoFour={{
						label: "Target Calories",
						value: dailyCalories,
						unit: "kcal"
						}}
					/>
				</ScrollView>

				<SemiBoldText style={{ textAlign: "left", paddingLeft: 40, paddingBottom: 5 }}>
					Need some guidance?
				</SemiBoldText>
				<TrainerPanel style={{ alignSelf: "center" }}/>
			</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
	},
	container: {
		flex: 0.7,
		paddingTop: 130,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center"
	},
	header: {
		position: 'absolute',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		top: 0,
		left: 0,
		right: 0,
		height: 130,
		backgroundColor: "#A7F3D0",
		padding: 20,
		zIndex: 1000,
	}, 
	headerText: {
		flexDirection: "column",
		paddingLeft: 30
	},
	biographyScrollView: {
		height: 180,
		alignItems: "center",
	},
	infoPanel: {
		marginLeft: 10,
		marginRight: 10
	}
})