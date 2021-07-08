import React from 'react'
import { Animated, View, StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

export default function DotProgress({ scrolling }) {
	const opacityFirst = scrolling.interpolate({
		inputRange: [-height, 0 , height],
		outputRange: [0.2, 1, 0.2],
		extrapolate: 'clamp',
	 })

	 const opacitySecond = scrolling.interpolate({
		inputRange: [0, height, 2 * height],
		outputRange: [0.2, 1, 0.2],
		extrapolate: 'clamp',
	 })
	 
	return (
		<View style={styles.container}>
			<Animated.View 
				style={styles.dot} 
				opacity={opacityFirst}
			/>
			<Animated.View 
				style={styles.dot} 
				opacity={opacitySecond}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		left: 0.02 * width,
		top: 0.22 * height,
		width: 20,
		height: 100,
	},
	dot: {
		height: 25,
		width: 5,
		borderRadius: 5,
		marginTop: 10,
		backgroundColor: "#2563EB"
	}
})