import React from 'react'
import { Animated, View, StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

export default function DotProgress({ scrolling }) {
	const opacityFirst = scrolling.interpolate({
		inputRange: [-width, 0 , width],
		outputRange: [0.2, 1, 0.2],
		extrapolate: 'clamp',
	 })

	 const opacitySecond = scrolling.interpolate({
		inputRange: [0, width, 2 * width],
		outputRange: [0.2, 1, 0.2],
		extrapolate: 'clamp',
	 })

	 const opacityThird = scrolling.interpolate({
		inputRange: [width, 2 * width, 3 * width],
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
			<Animated.View 
				style={styles.dot} 
				opacity={opacityThird}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center',
		top: 5,
		left: 0,
		right: 0,
		width: width,
		height: 60,
		zIndex: 1000,
	},
	dot: {
		height: 5,
		width: 80,
		borderRadius: 5,
		marginLeft: 10,
		backgroundColor: "#2563EB"
	}
})