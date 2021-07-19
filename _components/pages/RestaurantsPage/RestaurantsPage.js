import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, FlatList, SafeAreaView, Animated as AnimatedRN, Image } from 'react-native'
import { Container } from '../../_atoms/Container'
import MapView, { Marker, PROVIDER_GOOGLE, Animated, AnimatedRegion} from 'react-native-maps'
import * as Location from 'expo-location';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Restaurant } from '../../_molecules/Restaurant';
import { SearchBar, Overlay } from 'react-native-elements';
import { EditButton, IconButton } from '../../_atoms/Button';
import Constants from 'expo-constants';
import { ComponentsColors } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurants_API } from '../../../_redux/actions/Restaurants.actions';
import { HeaderMediumText } from '../../_atoms/Text';
import { Header } from '../../_molecules/Header';
import { TextInput } from '../../_molecules/TextInput';
import { EditButtonGroup } from '../../_molecules/EditButtons';

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

export default function RestaurantsPage() {
    const fakeRestaurants = [
        {
            id: 1,
            name: "Subway",
            latitude: 1.3497273,
            longitude: 103.7494751,
            menuItems: fakeMenuItems
        },
        {
            id: 2,
            name: "McDonalds",
            latitude: 1.3479198,
            longitude: 103.7443839,
            menuItems: fakeMenuItems
        }, 
        {
            id: 3, 
            name: "Sri Sun Express",
            latitude: 1.3504691,
            longitude: 103.7456429,
            menuItems: fakeMenuItems
        }
    ]
    const [userLocation, setUserLocation] = useState(new AnimatedRegion(null))
    const [location , setLocation] = useState(new AnimatedRegion(null))
    const [index, setIndex] = useState(1)
    const [restName, setRestName] = useState("")
    const [loading, setLoading] = useState(true) 
    const [visible, setVisible] = useState(false);
    const { restaurants } = useSelector(state => state.restaurants)
    const dispatch = useDispatch()
    let currentLocation = new AnimatedRegion(location)

    const Restaurants = () => {
        return (
            restaurants.map(rest => {
                                    
                                    return (<Marker key={rest.id} coordinate={{
                                            longitude: Number(rest.longitude), 
                                            latitude: Number(rest.latitude), 
                                            latitudeDelta: 0.02,
                                            longitudeDelta: 0.01}}
                                            title= {rest.name}
                                            >
                                                <Image  source={require('../../../assets/mapMarker.png')} 
                                                        style={{height: 33, width:20 }}></Image>
                                            </Marker>)
                                    }
            )
        )
    }

    useEffect(() => {
        const preload = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
            }

            let currlocation = await Location.getCurrentPositionAsync({});
            const currentUserLocation = new AnimatedRegion({
                latitude: currlocation.coords.latitude,
                longitude: currlocation.coords.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.01,
            });
            setLocation(currentUserLocation)
            setUserLocation(currentUserLocation)
            dispatch(getRestaurants_API())
        }
        preload().then(setLoading(false))

      }, []);

    const bottomSheetRef = useRef(null)
    const mapView = useRef(null)
    
    const indexToggle = () => {
        if (index == 1) {
            bottomSheetRef.current.expand()
            setIndex(2)
        } else {
            bottomSheetRef.current.snapTo(1)
            setIndex(1)
        
    }}

    // variables
    const snapPoints = useMemo(() => [-1, '20%', '50%'], []);
    // callbacks
    const handleSheetChanges = useCallback((index) => {
    }, []);  
    const searchBar = (
            <View style={{position: 'absolute', top: 0, width: "100%"}}>
                <IconButton
                iconName={"arrow-back"}
                iconSize={30}
                iconColor="black"
                buttonStyle={{position: 'absolute', left: 5, top: 48}}
                onPress={() => props.navigation.goBack()}
                />
                <SearchBar  autoCapitalize="none" 
                            lightTheme platform="ios" 
                            placeholder="search for..." 
                            inputContainerStyle={{height: 35}}
                            buttonStyle={{position: 'absolute', right: 10}}
                            inputContainerStyle={{height: 50, alignSelf: 'center', width: "100%", backgroundColor: "silver"}}
                            containerStyle={{height: 50, width:"76%", alignSelf: 'flex-end', borderRadius: 10, top: 45, right: 47, backgroundColor: "silver"}}/>
                <IconButton iconColor="black" 
                            iconName="compass" 
                            buttonStyle={{position: 'absolute', right: 5, top: 48}} 
                            iconSize={30}
                            onPress={() => goToUser()}></IconButton>
            </View>
    )
    
    const animateTo = async (region) => {
        currentLocation.timing({...region, duration: 1000, useNativeDriver: false}).start()
    }

    const goToUser = async () => {
        let currlocation = await Location.getCurrentPositionAsync({});
        const now = {
            longitude: currlocation.coords.longitude,
            latitude: currlocation.coords.latitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.01, 
        }
        animateTo(now)
    }
    
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const addItemPress = (id) => {
        const currName = restaurants.filter(rest => rest.id === id).name
        setRestName(currName)
        toggleOverlay()
    }

    const onViewRef = React.useRef(( {viewableItems})=> {
        const viewedItem = Object.getOwnPropertyDescriptors(viewableItems[0])
        setRestName(viewedItem.item.value.name)
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

    return (
        <View>
            <Animated ref={mapView} style={styles.map} region={currentLocation} showMyLocationButton={true} showsUserLocation={true} mapPadding={{bottom: 200}}>
            {Restaurants()}
            </Animated>
            <Overlay overlayStyle={{borderRadius: 18, minHeight: 380, width: 360}} visible={visible} onBackdropPress={toggleOverlay}>
                <HeaderMediumText style={{margin:10}}>Add a menu item to {restName}!</HeaderMediumText>
                <TextInput
                    label="Name"
                    placeholder="enter the item name!"
                    // onChangeText={handleChange('username')}
                    // onBlur={handleBlur('username')}
                    // value={values.username}
                    // feedbackMessage={errors.username}
                    // touched={touched.username}
                    autoCapitalize="none"
                />
                <TextInput
                    label="Description"
                    placeholder="enter the description!"
                    // onChangeText={handleChange('username')}
                    // onBlur={handleBlur('username')}
                    // value={values.username}
                    // feedbackMessage={errors.username}
                    // touched={touched.username}
                    autoCapitalize="none"
                />
                <TextInput
                    label="Calories"
                    placeholder="enter the amount of calories!"
                    // onChangeText={handleChange('username')}
                    // onBlur={handleBlur('username')}
                    // value={values.username}
                    // feedbackMessage={errors.username}
                    // touched={touched.username}
                    autoCapitalize="none"
                />
                <View style={{borderWidth: 0, alignSelf: 'center', flexDirection: 'row', justifyContent:'space-around', alignItems: 'center', width:320, margin: 10}}>
                    <IconButton buttonStyle={styles.button} iconSize={23} buttonColor="#E53E3E" iconName= "trash" ></IconButton>
                    <IconButton buttonStyle={styles.button} iconSize={21} buttonColor="#319795" iconName= "save" ></IconButton>
                </View>
            </Overlay>
            {searchBar}
            <BottomSheet
                ref={bottomSheetRef}
                index={index}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <FlatList data={restaurants}
                          viewabilityConfig = {viewConfigRef.current}
                          onViewableItemsChanged = {onViewRef.current}
                          keyExtractor={(item) => item.id.toString()}
                          renderItem={({item}) => {
                            return <Restaurant  key={item.id.toString()} 
                                                location= {{longitude: item.longitude, latitude: item.latitude, latitudeDelta: 0.02, longitudeDelta: 0.01}} 
                                                id= {item.id} 
                                                animate={animateTo}
                                                addItem={toggleOverlay}
                                                name={item.name} 
                                                index={index} 
                                                indexToggle={indexToggle} 
                                                key= {item.id.toString()} 
                                                menuItems= {item.menuItem}></Restaurant>}
                          }
                          directionalLockEnabled={true} 
                          decelerationRate={'fast'} 
                          snapToInterval={390} 
                          snapToAlignment={"center"} 
                          automaticallyAdjustContentInsets={false}
                          disableIntervalMomentum horizontal={true} 
                          contentContainerStyle={{ flexDirection: 'row', alignSelf: 'flex-start', minWidth: "100%", minHeight: 250}}>
                    {/* {fakeRestaurants.map(rest => <Restaurant id= {rest.id} name={rest.name} index={index} indexToggle={indexToggle} key= {rest.id.toString()} menuItems= {rest.menuItems}></Restaurant>)} */}
                </FlatList>
            </BottomSheet>
            
    </View>
        
    )
}
                    
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff'
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    button: {
        flex: 0.4,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        height: 35,
    }
}
)
