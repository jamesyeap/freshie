import React, { useCallback, useMemo, useRef, useState } from 'react'
import { SafeAreaView, View, FlatList, Text, TouchableOpacity, Button, StyleSheet, Dimensions } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { TextInput } from './_components/_molecules/TextInput'
import { IconButton } from './_components/_atoms/Button'
import { RegularText, SemiBoldText, HeaderMediumText } from './_components/_atoms/Text'
import searchRestaurant from './_utilities/_helperFunctions/searchRestaurant'
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window')

export default function AddNewRestaurantSection(props) {
	const bottomSheetRef = useRef(null)
	const snapPoints = useMemo(() => [-1, '25%', '50%'], [])
	const handleSheetChanges = useCallback((index) => {
		console.log('handleSheetChanges', index);
	}, []);
	const [restaurantsFound, setRestaurantsFound] = useState(null)
	const [query, setQuery] = useState("")
	const [touched, setTouched] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleSearchRestaurant = async () => {
		setTouched(true)
		setLoading(true)
		const results = await searchRestaurant(query)
		setRestaurantsFound(results)
		setLoading(false)
	}

	const handleClose = () => {
		setQuery("")
		setRestaurantsFound(null)
		setTouched(false)
		bottomSheetRef.current.collapse()
	}

	const LoadingScreen = () => {
		return (
			<View style={styles.animationContainer}>
				<LottieView 
					source={require('./assets/52102-searching.json')} 
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
					source={require('./assets/55478-hello-bubble.json')} 
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
					source={require('./assets/7903-error-404.json')} 
					autoPlay 
					loop
					style={{ height: 0.3 * width, width: 0.3 * width }}
				/>

				<Text style={styles.animationText}>Dayum no matches.</Text>
			</View>
	)}

	const SearchResult = (props) => {
		
		return (
			<TouchableOpacity style={styles.searchResultContainer} onPress={() => alert(`longitude: ${props.longitude} latitude: ${props.latitude}`)}>
				<SemiBoldText>{props.name}</SemiBoldText>
				<RegularText>{props.address}</RegularText>
			</TouchableOpacity>
		)
	}

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