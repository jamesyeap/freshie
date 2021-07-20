import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { KeyboardAvoidingView, Animated, View, Dimensions, StyleSheet, Button } from 'react-native'
import { Container } from '../../_atoms/Container'
import { SemiBoldText } from '../../_atoms/Text'
import { TextInput } from '../../_molecules/TextInput'
import { Overlay, AnimatedRegion, Animated as AnimatedMap } from 'react-native-maps'
import BottomSheet from '@gorhom/bottom-sheet';
import * as Location from 'expo-location';

const { height, width } = Dimensions.get('window')

export function Header({ scrolling }) {
	const translation = scrolling.interpolate({
		inputRange: [0, width , 2 * width],
		outputRange: [-130, 0, -130],
		extrapolate: 'clamp',
	  })

	 const opacity = scrolling.interpolate({
		inputRange: [0, width , 2 * width],
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
				<SemiBoldText style={{ fontSize: 20 }}>Add a restaurant!</SemiBoldText>
			</View>
		</Animated.View>
	</>
	)
}

export default function AddRestaurantSection(props) {
	const [ restaurantName, setRestaurantName ] = useState("");
	const [region, setRegion] = React.useState(new AnimatedRegion({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	}))
	const [preloading, setPreloading] = useState(true)
	const [errorMessage, setErrorMessage] = useState("")

	// gets the user's initial location
	useEffect(() => {
		const preload = async () => {
		  let { status } = await Location.requestForegroundPermissionsAsync();
		  if (status !== 'granted') {
			setErrorMessage('Permission to access location was denied');
			return;
		  }
	
		  let location = await Location.getCurrentPositionAsync({});
		  console.log(location)
		  setRegion(new AnimatedRegion({
			  latitude: location.coords.latitude,
			  longitude: location.coords.longitude,
			  latitudeDelta: 0.02,
			  longitudeDelta: 0.01
		  }));
		}

		preload().then(setPreloading(false))
	  }, []);

	const bottomSheetRef = useRef(null);

	// variables
	const snapPoints = useMemo(() => ['25%', '50%'], []);
  
	// callbacks
	const handleSheetChanges = useCallback((index) => {
	  console.log('handleSheetChanges', index);
	}, []);
  
	const mapView = React.useRef(null)
	let currentRegion = new AnimatedRegion(region);

	const MOVIE = {latitude: 43.9242,
        longitude: -79.1903,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,}
	
	const initialRegion = {
		latitude: 1.36491,
		longitude: 103.822,
		latitudeDelta: 0,
		longitudeDelta: 0
	}

	const changeRegion = () => {
		currentRegion
		.timing({...MOVIE, duration: 1500})
		.start();
	}

	return (
		<KeyboardAvoidingView>
			<AnimatedMap
			ref={mapView}
			style={styles.map} 
			initialRegion={initialRegion}
			region={currentRegion}
			onRegionChange={region => setRegion(region)}
			loadingEnabled={preloading}
			>

			</AnimatedMap>

			<BottomSheet
				ref={bottomSheetRef}
				index={1}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
			>

				<View style={styles.bottomSheetContainer}>
				<TextInput 
				placeholder={"Search restaurant"} 
				onChangeText={input => setRestaurantName(input)} 
				value={restaurantName}
				/>

				<Button title="Test Search" onPress={() => searchRestaurant(restaurantName, 3)} />


			</View>
			</BottomSheet>
		</KeyboardAvoidingView>
	)

}

const styles = StyleSheet.create({
	header: {
		position: 'absolute',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		top: 0,
		left: 0,
		right: 0,
		height: 100,
		backgroundColor: "#FDE68A",
		padding: 15,
		zIndex: 1000,
	}, 
	headerText: {
		flexDirection: "column",
		paddingLeft: 20
	},
	map: {
		width: width,
		height: height,
	},
	bottomSheetContainer: {
		flex: 1,
		alignItems: 'center',
	}

})