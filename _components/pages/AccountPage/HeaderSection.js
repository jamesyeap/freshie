import React from 'react'
import { useSelector } from 'react-redux'
import { View, Animated, StyleSheet, Dimensions } from 'react-native'
import { HeaderMediumText, RegularText } from '../../_atoms/Text'

export default function HeaderSection({ translation }) {
	const { username } = useSelector(state => state.auth)

	return (
		<>
			<Animated.View
				style={{
					...styles.container,
					transform: [
						{ translateY: translation }
					]
				}}
			>	
				<View style={styles.welcomeContainer}>
					<RegularText>More about you!</RegularText>
					<HeaderMediumText style={{ textAlign: 'left' }}>
						{username}!
					</HeaderMediumText>
				</View>
			</Animated.View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		top: 0,
		left: 0,
		right: 0,
		height: 130,
		backgroundColor: "#A7F3D0",
		padding: 20,
	},
	welcomeContainer: {
		flexDirection: "column",
		paddingLeft: 30
	}
})