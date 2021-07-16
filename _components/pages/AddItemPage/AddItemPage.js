import React, { useRef } from 'react'
import { Container } from '../../_atoms/Container'
import { RegularText } from '../../_atoms/Text';
import { Animated, Dimensions, View, ScrollView, StyleSheet } from 'react-native'

import AddFoodItemSection from './AddFoodItemSection';
import { Header as AddFoodItemHeader } from './AddFoodItemSection'

import AddRestaurantSection from './AddRestaurantSection'
import { Header as AddRestaurantHeader } from './AddRestaurantSection'

const { height, width } = Dimensions.get('window')

export default function AddItemPage(props) {
	const scrolling = useRef(new Animated.Value(0)).current

	return (
		<Container>
			{/* Headers */}
			<AddFoodItemHeader scrolling={scrolling} />
			<AddRestaurantHeader scrolling={scrolling} />

			<Animated.ScrollView
			style={{ flex: 1 }}
			onScroll={
				// updates the variable "scrolling" as user 
				//		moves down/up the page
				Animated.event([
					{
						nativeEvent: {
							contentOffset: {
								x: scrolling
							}
						}
					}
				],	{ useNativeDriver: true }
			)}
			showsHorizontalScrollIndicator={false}
			// onScroll will be run every 16ms
			scrollEventThrottle={16}

			// props to make homepage snap to each page
			decelerationRate={0}
			snapToInterval={width}
			snapToAlignment="center"
			horizontal
			>
				
			<ScrollView style={styles.scrollContainer}>
					<AddFoodItemSection navigation={props.navigation} route={props.route} />
			</ScrollView>

			<View style={styles.scrollContainer}>
					<AddRestaurantSection navigation={props.navigation} />
			</View>
			
			</Animated.ScrollView>

		</Container>
	)
}

const styles = StyleSheet.create({
	scrollContainer: {
		flex: 1,
		width: width,
	}
})