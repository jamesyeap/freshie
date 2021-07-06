import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Container } from '../../_atoms/Container'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Restaurant } from '../../_molecules/Restaurant';


const fakeMenuItems = [
    {
        id: 1,
        name: "Subway Melt",
        calories: 300,
        description: "melted subway"
    }, 
    {
        id: 2,
        name: "Subway Melt",
        calories: 300,
        description: "melted subway"
    },
    {
        id: 3,
        name: "Subway Melt",
        calories: 300,
        description: "melted subway"
    },
    {
        id: 4,
        name: "Subway Melt",
        calories: 300,
        description: "melted subway"
    }
]

const fakeRestaurants = [
    {
        id: 1,
        name: "Subway",
        latitude: 1.3459395,
        longitude: 103.7482784,
        menuItems: fakeMenuItems
    },
    {
        id: 2,
        name: "McDonalds",
        latitude: 1.3459395,
        longitude: 103.7417322,
        menuItems: fakeMenuItems
    }, 
    {
        id: 3, 
        name: "Sri Sun Express",
        latitude: 1.3478364,
        longitude: 103.7318886,
        menuItems: fakeMenuItems
    }
]

export default function RestaurantsPage() {
    const [location, setLocation] = useState(null);
    const [index, setIndex] = useState(1)

    const Restaurants = () => {
        return (
            fakeRestaurants.map(rest => {
                                    
                                    return (<Marker key={rest.id} coordinate={{
                                            longitude: rest.longitude, 
                                            latitude: rest.latitude, 
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421}}
                                            title= {rest.name}
                                            ></Marker>)
                                    }
            )
        )
    }

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          console.log(location)
        })();
      }, []);

    const bottomSheetRef = useRef(null);
    
    const indexToggle = () => {
        if (index == 0) {
            bottomSheetRef.current.expand()
            setIndex(1)
        } else {
            bottomSheetRef.current.collapse()
            setIndex(0)
        
    }}

    // variables
    const snapPoints = useMemo(() => ['20%', '50%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    }, []);  

    const initialLocation = location ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    } : location

    return (
        <View>
            <MapView style={styles.map} region={initialLocation} provider= {PROVIDER_GOOGLE}>
            {/* <Marker coordinate={initialLocation}></Marker> */}
            {Restaurants()}
            <BottomSheet
                ref={bottomSheetRef}
                index={index}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <BottomSheetScrollView decelerationRate={'fast'} snapToInterval={390} snapToAlignment={"center"} 
                    disableIntervalMomentum horizontal={true} contentContainerStyle={{ flexDirection: 'row', alignSelf: 'flex-start', minWidth: "100%", minHeight: index == 0 ? 580 : 550}}>
                    {fakeRestaurants.map(rest => <Restaurant id= {rest.id} name={rest.name} index={index} indexToggle={indexToggle} key= {rest.id.toString()} menuItems= {rest.menuItems}></Restaurant>)}
                </BottomSheetScrollView>
            </BottomSheet>
            </MapView>
        </View>
    )
}
                    
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }
}
)
