import React, { useState } from 'react'
import { View, Animated, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { RegularText, HeaderMediumText, SemiBoldText } from '../../_atoms/Text';
import { BigButton, MediumButton, SmallButton } from '../../_atoms/Button';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAsync_API } from '../../../_redux/actions/Auth.actions'
import { updateDailyCalories_API } from '../../../_redux/actions/Client.actions'
import { InfoPanel } from '../../_organisms/InfoPanel';
import Constants from 'expo-constants';
import { TrainerPanel } from '../../_organisms/TrainerPanel';
import { MediumComponentContainer } from '../../_atoms/Container';
import { TextInput } from '../../_molecules/TextInput';

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
				<RegularText>More about you,</RegularText>
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
	const dispatch = useDispatch()
	const [referralCode, setReferralCode] = useState("");
	const [targetCalories, setTargetCalories] = useState(null);

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
					snapToInterval={330}
					disableIntervalMomentum
					snapToAlignment="center"
					contentContainerStyle={ styles.biographyScrollView }
					showsHorizontalScrollIndicator={false}
					style={{ marginHorizontal: 20 }}
				>
					<InfoPanel 
						labelColor="#60A5FA"
						valueColor="#2563EB"
						unitColor="#60A5FA"
						backgroundColor="#FEF3C7"
						style={styles.infoPanel}

						infoOne={{
						label: "Height",
						value: 170,
						unit: "cm"
						}}
						infoTwo={{
						label: "Age",
						value: 23,
						unit: "years old"
						}}
						infoThree={{
						label: "Weight",
						value: 70,
						unit: "kg"
						}}
						infoFour={{
						label: "Target Weight",
						value: 65.94,
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
						value: 24.2,
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

					<MediumComponentContainer 
						style={styles.updateStatsContainer}
					>
						<TextInput 
							label="Change target calories"
							value={targetCalories}
							onChangeText={setTargetCalories}
							placeholder="500 kcal"
							containerStyle={{ width: 200 }}
							inputStyle={{ width: 200 }}
							labelStyle={{ color: "#BE185D" }}
						/>
						<SmallButton 
							label="Update"
							onPress={() => dispatch(updateDailyCalories_API(targetCalories))}
							buttonStyle={{ 
								backgroundColor: "#EC4899",
								width: 100,
								alignSelf: "flex-end",
								marginRight: 50
							}}
						/>
					</MediumComponentContainer>
				</ScrollView>

				<SemiBoldText style={{ textAlign: "left", paddingLeft: 40, paddingBottom: 5 }}>
					Need some guidance?
				</SemiBoldText>

				<TrainerPanel style={{ alignSelf: "center" }}/>

				<BigButton
					label="Log Out"
					buttonStyle={{ marginTop: 15, backgroundColor: "#D53F8C", alignSelf: 'center' }}
					onPress={() => dispatch(logoutAsync_API())}
				/>
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
	},
	updateStatsContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 6,
		marginBottom: 12,
		minHeight: 150,
		backgroundColor: "#FBCFE8"
	}
})