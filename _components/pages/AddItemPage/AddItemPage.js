import React, { useRef } from 'react'
import { Container } from '../../_atoms/Container'
import { RegularText } from '../../_atoms/Text';
import { Animated, Dimensions, View, ScrollView, StyleSheet } from 'react-native'

import AddFoodItemSection from './AddFoodItemSection';

const { height, width } = Dimensions.get('window')

export default function AddItemPage(props) {
	const scrolling = useRef(new Animated.Value(0)).current

	return (
		<Container>
			<ScrollView style={styles.scrollContainer}>
				<AddFoodItemSection navigation={props.navigation} route={props.route} />
			</ScrollView>

		</Container>
	)
}

const styles = StyleSheet.create({
	scrollContainer: {
		flex: 1,
		width: width,
	}
})