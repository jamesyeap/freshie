import React, { useCallback, useMemo, useRef } from 'react'
import {  View, FlatList, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { RegularText, SemiBoldText } from '../../_atoms/Text'
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window')

export default function AddNewRestaurantSection({ 
	touched, 
	fetchingData, 
	restaurantsFound,
	animateTo,
	handlePressNewRestaurantItem
}) {
	const bottomSheetRef = useRef(null)
	const snapPoints = useMemo(() => [-1, '25%', '40%'], [])
	const handleSheetChanges = useCallback((index) => {
		console.log('handleSheetChanges', index);
	}, []);


	const LoadingScreen = () => {
		return (
			<View style={styles.animationContainer}>
				<LottieView 
					source={require('../../../assets/52102-searching.json')} 
					autoPlay 
					loop
					autoSize 
				/>
				<Text style={styles.animationText}>Searching...</Text>
			</View>
	)}

	const StartingScreen = () => {
		return (
			<View style={styles.animationContainer}>
				<LottieView 
					source={require('../../../assets/55478-hello-bubble.json')} 
					autoPlay 
					loop
					autoSize
				/>
				<Text style={styles.animationText}>Enter something to get started!</Text>
			</View>
	)}

	const EmptyScreen = () => {
		return (
			<View style={styles.animationContainer}>
				<LottieView 
					source={require('../../../assets/7903-error-404.json')} 
					autoPlay 
					loop
					style={{ height: 0.3 * width, width: 0.3 * width }}
				/>

				<Text style={styles.animationText}>Dayum no matches.</Text>
			</View>
	)}

	const SearchResult = (props) => {
		const handleAnimateTo = () => {
			props.animate({
				longitude: props.longitude,
				latitude: props.latitude,
				longitudeDelta: 0.02,
				latitudeDelta: 0.01
			}, false)
		}

		const handlePress = () => {
			handleAnimateTo()
			handlePressNewRestaurantItem(props.newRestaurantObj)
		}
		
		return (
			<TouchableOpacity 
				style={styles.searchResultContainer} 
				onPress={handlePress}
			>
				<SemiBoldText>{props.name}</SemiBoldText>
				<RegularText>{props.address}</RegularText>
			</TouchableOpacity>
		)
	}

	return (
		<>
			<Text>Hello</Text>
			<BottomSheet
				ref={bottomSheetRef}
				index={2}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
			>
				<View style={styles.contentContainer}>
					{!touched
						? StartingScreen()
						: fetchingData 
							? LoadingScreen()
							: (
								<FlatList
									data={restaurantsFound}
									renderItem={({ item }) => 
										<SearchResult 
											key={item.id.toString()}
											id={item.id}
											name={item.name} 
											address={item.address} 
											longitude={item.longitude}
											latitude={item.latitude}
											category={item.category}
											animate={animateTo}
											newRestaurantObj={item}
										/>}
									contentContainerStyle={styles.flatListContentContainer}
									ListEmptyComponent={<EmptyScreen />}
								/>
							)
					}
				</View>
		</BottomSheet>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: 'white',
	  },
	  contentContainer: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#FFFBEB'
	  },
	  searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: width
	  },
	  inputStyle: {
		backgroundColor: '#FDE68A',
		width: 0.75 * width
	  },
	  flatListContentContainer: {
		alignItems: 'center',
		width: 0.9 * width
	  },
	  searchResultContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#FEF3C7',
		width: 0.85 * width,
		margin: 5,
		borderRadius: 5,
		padding: 15
	  }, 
	  headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: width,
		padding: 20,
	},
	headerText: {
		fontFamily: 'Inter_700Bold',
		color: '#064E3B',
		fontSize: 28,
		marginLeft: 15
	},
	closeButtonText: {
		fontFamily: 'Inter_500Medium',
		fontSize: 16,
		color: '#DC2626',
		marginRight: 20
	},
	animationContainer: {
		height: 0.65 * width,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	animationText: {
		fontFamily: 'Inter_500Medium',	
		fontSize: 18
	}
})


/*

return (
		<SafeAreaView style={styles.container}>
			<Text>Test</Text>
			<Button title="OpenFull" onPress={() => bottomSheetRef.current.expand()}></Button>
			<Button title="OpenHalf" onPress={() => bottomSheetRef.current.snapTo(1)}></Button>
			<Button title="Close" onPress={() => bottomSheetRef.current.collapse()}></Button>

			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
			>
				<View style={styles.contentContainer}>
					<View style={styles.headerContainer}>
						<Text style={styles.headerText}>What's around?</Text>
						<TouchableOpacity style={{ marginLeft: 10 }} onPress={handleClose}>
							<Text style={styles.closeButtonText}>Close</Text>
						</TouchableOpacity>
					</View>
					
					<View style={styles.searchContainer}>
						<TextInput 
							value={query}
							onChangeText={setQuery}
							inputStyle={styles.inputStyle}
						/>
						<IconButton
							iconName='search'
							iconSize={20}
							iconColor='#F59E0B'
							onPress={handleSearchRestaurant}
						/>
					</View>

					{!touched
						? StartingScreen()
						: loading 
							? LoadingScreen()
							: (
								<FlatList
									data={restaurantsFound}
									renderItem={({ item }) => 
										<SearchResult 
											key={item.id.toString()}
											id={item.id}
											name={item.name} 
											address={item.address} 
											longitude={item.longitude}
											latitude={item.latitude}
										/>}
									contentContainerStyle={styles.flatListContentContainer}
									ListEmptyComponent={<EmptyScreen />}
								/>
							)


					}
				</View>
		</BottomSheet>
		</SafeAreaView>
	)

*/