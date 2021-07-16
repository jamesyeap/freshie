import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Animated, View, Dimensions, StyleSheet } from 'react-native';
import { RegularText } from '../../_atoms/Text';

import TrainerMealsSection from '../../_organisms/TrainerMealsSection/TrainerMealsSection';
import { Header as TrainerMealsHeader } from '../../_organisms/TrainerMealsSection/TrainerMealsSection';

import CustomMealsSection from '../../_organisms/CustomMealsSection/CustomMealsSection';
import { Header as CustomMealsHeader } from '../../_organisms/CustomMealsSection/CustomMealsSection';

import FavoriteMealsSection from '../../_organisms/FavoriteMealsSection/FavoriteMealsSection';
import { Header as FavoriteMealsHeader } from '../../_organisms/FavoriteMealsSection/FavoriteMealsSection';

import { getRecipeList_API, getMealPlans_API, acknowledge } from '../../../_redux/actions/Recipes.actions';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar } from 'react-native-paper';
import FAB from './FAB.js'

const Container = styled.SafeAreaView`
	flex: 1;
	flexDirection: column;
	justifyContent: center;
	backgroundColor: #CCD7E0;
`;

const { height, width } = Dimensions.get('window')

export default function MealsPage(props) {
	const dispatch = useDispatch();
	const [preloading, setPreloading] = useState(true)
	const { loadingRecipe, errorRecipe } = useSelector(state => state.recipe);
	const { loadingClient, errorClient } = useSelector(state => state.client);
	const scrolling = useRef(new Animated.Value(0)).current;
	
	// Fetches list of recipes before rendering the page
	useEffect(() => {
		Promise.all(
			dispatch(getRecipeList_API("custom")),
			dispatch(getMealPlans_API())
		).then(setPreloading(false))
	}, []);

	if (preloading) {
		return <View><RegularText>Loading</RegularText></View>
	}

	return (
		<Container style={styles.container}>
			{/* Header */}
			<TrainerMealsHeader scrolling={scrolling} />
			<CustomMealsHeader scrolling={scrolling} />
			<FavoriteMealsHeader scrolling={scrolling} />

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

				<View style={styles.scrollContainer}>
					<TrainerMealsSection navigation={props.navigation} />
				</View>

				<View style={styles.scrollContainer}>
					<CustomMealsSection navigation={props.navigation} />
				</View>

				<View style={styles.scrollContainer}>
					<FavoriteMealsSection navigation={props.navigation} />
				</View>
			

			</Animated.ScrollView>

			<Snackbar style={{ backgroundColor: "#60A5FA", marginBottom: 40 }} visible={loadingClient || loadingRecipe}>Loading</Snackbar>
			<Snackbar 
			 style={{ backgroundColor: "#F87171", marginBottom: 40 }}
			 visible={errorRecipe || errorClient}
			 onDismiss={() => dispatch(acknowledge())}
			 action={{
			 label: 'ok',
			 onPress: () => {
				dispatch(acknowledge())
			 	}
			 }}
			>
				{errorRecipe || errorClient}
			</Snackbar>

			<FAB navigation={props.navigation} />
		</Container>
	)
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: "#FFFBEB"
	},
	scrollContainer: {
		height: height,
		width: width,
		paddingTop: 100,
		backgroundColor: "#FFFBEB"
	}
})

