import React, { useState } from 'react';
import { searchFoodProduct } from '../../../_redux/actions/Price.actions';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, Keyboard, View, Dimensions, FlatList } from 'react-native';
import SearchBar from '../../_molecules/SearchBar';
import SearchResult from './SearchResult';
import LottieView from 'lottie-react-native';

const { height, width } = Dimensions.get('window')

// SearchPage is actually a part of a bottom sheet;
// 		it requires some functions to control its appearance
//		on the main page.
interface SearchPageProps {
	handleExpand: Function;
	handleClose: Function;
	existingSearchQuery?: String;
}

export default function SearchPage(props: SearchPageProps) {
	const [searchQuery, setSearchQuery] = useState(props.existingSearchQuery)
	const [touched, setTouched] = useState(false)

	const dispatch = useDispatch()
	const { results, loading } = useSelector(state => state.prices)
  
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

	const handleSearch = () => {
	  setTouched(true)
	  dispatch(searchFoodProduct(searchQuery))
	  Keyboard.dismiss()
	}

	const handleClose = () => {
		setTouched(false)
		props.handleClose()
		Keyboard.dismiss()
		setSearchQuery("")
	}

	return (
		<View 
			style={styles.container}
		>
			<View style={styles.headerContainer}>
				<Text style={styles.headerText}>What do you need?</Text>
				<TouchableOpacity onPress={handleClose} style={{ marginLeft: 32 }}>
					<Text style={styles.closeButtonText}>Close</Text>
				</TouchableOpacity>
			</View>

			<SearchBar
				value={searchQuery}
				onChangeText={setSearchQuery}
				handleSubmit={handleSearch}
			/>

			<View style={styles.resultSection}>
				{ 	
					!touched
						? StartingScreen()
						: loading 
							? LoadingScreen()
							: (<FlatList
								contentContainerStyle={styles.resultList}
								data={results}
								renderItem={({ item, index, separators}) => (
									<SearchResult 
										key = { index }
										title={ item.title }
										price={ item.price }
										measurement={ item.measurement }
										link={ item.link }
										supermarket= { item.supermarket }
									/>
								)}
								keyExtractor={(item, index) => index.toString()}
								ListEmptyComponent={<EmptyScreen />}
								horizontal
								snapToAlignment="start"
								snapToInterval={0.515 * width}
								showsHorizontalScrollIndicator={false}
								/>)
				} 
			</View>
		</View>
	);
  }
  
  const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  flexDirection: 'column',
	  alignItems: 'center',
	  justifyContent: 'flex-start',
	  paddingTop: 0.1 * height,
	  backgroundColor: '#D1FAE5',
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: 0.1 * height,
		width: width,
		position: 'absolute',
		top: 0,
		left: 0,
	},
	headerText: {
		fontFamily: 'Inter_700Bold',
		color: '#064E3B',
		fontSize: 26,
		marginLeft: 0.08 * width,
	},
	searchBarContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10,
	},
	textInput: {
		borderWidth: 1,
		borderRadius: 5,
		width: 0.7 * width,
		height: 0.04 * height
	},
	closeButtonText: {
		fontFamily: 'Inter_500Medium',
		fontSize: 16,
		color: '#DC2626'
	},
	resultSection: {
		height: 0.65 * width,
	},
	resultList: {		
		borderRadius: 10,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center'
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
  });