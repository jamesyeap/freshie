import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { StyleSheet, View, Dimensions, FlatList, Image, Keyboard } from 'react-native'
import { Marker, Animated, AnimatedRegion, UrlTile, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';
import BottomSheet from '@gorhom/bottom-sheet';
import { Restaurant } from '../../_molecules/Restaurant';
import { SearchBar, Overlay } from 'react-native-elements';
import { IconButton } from '../../_atoms/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurants_API, addRestaurant_API, addMenuItem_API, consumeMenuItem_API, deleteMenuItem_API } from '../../../_redux/actions/Restaurants.actions';
import { HeaderMediumText } from '../../_atoms/Text';
import { TextInput } from '../../_molecules/TextInput';
import AddNewRestaurantSection from './AddNewRestaurantSection';
import searchRestaurant from '../../../_utilities/_helperFunctions/searchNewRestaurant'
import getRestaurantsAroundMe from '../../../_utilities/_helperFunctions/getRestaurantsAroundMe';
import { MenuItemButtonModal } from './MenuItemButtonModal';
import { NewRestaurantButtonModal } from './NewRestaurantButtonModal';
import { determineMealType } from '../../../_utilities/_helperFunctions/determineMealType';

export default function RestaurantsPage(props) {
    const initialUserLocation = useRef(null)
    const [userLocation, setUserLocation] = useState(new AnimatedRegion(null))
    const [location , setLocation] = useState(new AnimatedRegion(null))
    const [index, setIndex] = useState(0)

    const [existingRestaurants, setExistingRestaurants] = useState([])
    const [restName, setRestName] = useState("")
    const [loading, setLoading] = useState(true) 
    const [visible, setVisible] = useState(false);

    const [addNewRestaurantMode, setAddNewRestaurantMode] = useState(false)
    const [touched, setTouched] = useState(false)
    const [fetchingData, setFetchingData] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const [restaurantsFound, setRestaurantsFound] = useState(null)

    const [foodName, setFoodName] = useState("")
    const [foodDescription, setFoodDescription] = useState("")
    const [foodCalories, setFoodCalories] = useState("")

    const [showMenuItemButtonModal, setShowMenuItemButtonModal] = useState(false)
    const [selectedMenuItem, setSelectedMenuItem] = useState(null)

    const [showNewRestaurantButtonModal, setShowNewRestaurantModal] = useState(false)
    const [selectedNewRestaurant, setSelectedNewRestaurant] = useState(null)

    const { restaurants, loading: loadingExistingRestaurants, error } = useSelector(state => state.restaurants)

    const dispatch = useDispatch()

    let currentLocation = new AnimatedRegion(location)

    const Restaurants = () => {
        if (addNewRestaurantMode) {
            if (restaurantsFound !== null) {
                return (restaurantsFound.map(rest => (
                    <Marker 
                        key={rest.id} 
                        coordinate={{
                            longitude: Number(rest.longitude), 
                            latitude: Number(rest.latitude), 
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.01}}
                        title={rest.name}
                    >
                        <Image  
                            source={require('../../../assets/mapMarker.png')} 
                            style={{height: 33, width:20 }} 
                        />
                    </Marker>
                ))
            )
            }
        } else {
            return (restaurants.map(rest => (
                    <Marker 
                        key={rest.id} 
                        coordinate={{
                            longitude: Number(rest.longitude), 
                            latitude: Number(rest.latitude), 
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.01}}
                        title={rest.name}
                    >
                        <Image  
                            source={require('../../../assets/mapMarker.png')} 
                            style={{height: 33, width:20 }} 
                        />
                    </Marker>
                )
            )
        )}   
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

            initialUserLocation.current = currentLocation

            return true
        }
        if (preload()){
          setLoading(false)
        }
      }, []);

    // Runs a search query every time the user enters something into the search bar
    useEffect(() => {
        const handleSearchRestaurant = async () => {
            setTouched(true)
            setFetchingData(true)
            const results = await searchRestaurant(searchQuery)

            /* WORK IN PROGRESS - shows restaurants near me instead of me searching for a restaurant */
            // let currlocation = await Location.getCurrentPositionAsync({})
            // const results = await getRestaurantsAroundMe(currlocation.coords.longitude, currlocation.coords.latitude)
            setRestaurantsFound(results)
            setFetchingData(false)
        }
        
        if (addNewRestaurantMode) {
            if (searchQuery !== "") {
                setTimeout(() => handleSearchRestaurant(searchQuery), 500)
            }
        } else {
            // todo: searching existing restaurants
            const handleFilterRestaurants = () => {
                if (searchQuery !== "") {
                    const matchingRestaurants = restaurants.filter(elem => elem.name.toLowerCase().includes(searchQuery.toLowerCase())) 
                    setExistingRestaurants(matchingRestaurants)
                } else {
                    setExistingRestaurants(restaurants)
                }
            }

            setTimeout(() => handleFilterRestaurants(), 500)
        } 
    }, [searchQuery, restaurants])

    const bottomSheetRef = useRef(null)
    const mapView = useRef(null)
    
    const indexToggle = () => {
        if (index == 0) {
            bottomSheetRef.current.expand()
            setIndex(1)
        } else {
            bottomSheetRef.current.snapTo(0)
            setIndex(0)
    }}

    const snapPoints = useMemo(() => ['18%', '75%'], []);
    const handleSheetChanges = useCallback((index) => {
    }, []);  

    const handleChangeMode = () => {
        if (addNewRestaurantMode) {
            setSearchQuery("")
            setTouched(false)
            setRestaurantsFound(null)
            setTouched(false)

            setSelectedNewRestaurant(null)
            setShowNewRestaurantModal(false)
            
            setAddNewRestaurantMode(false)
        } else {
            setSelectedMenuItem(null)
            setShowMenuItemButtonModal(false)

            setSearchQuery("")
            setAddNewRestaurantMode(true)
        }
    }

    const handleAddMenuItem = () => {
        dispatch(addMenuItem_API({
            restaurant: restName.restaurantID,
            name: foodName,
            calories: Number(foodCalories),
            description: foodDescription
        }))

        setFoodName("")
        setFoodDescription("")
        setFoodCalories("")

        setVisible(false)
    }

    const handleCloseAddMenuModal = () => {
        setFoodName("")
        setFoodDescription("")
        setFoodCalories("")

        setVisible(false)
    }

    const handlePressMenuItem = (menuItemObj) => {
        setSelectedMenuItem(menuItemObj)
        setShowMenuItemButtonModal(true)
    }
    
    const handleConsumeMenuItem = () => {
        dispatch(consumeMenuItem_API({
          title: selectedMenuItem.name,
          calories: selectedMenuItem.calories,
          mealType: determineMealType()
        }))
    }

    const handleDeleteMenuItem = () => {
        const arg = {
            id: selectedMenuItem.id
        }

        dispatch(deleteMenuItem_API(arg))

        setSelectedMenuItem(null)
        setShowMenuItemButtonModal(false)
    }

    const handleCloseMenuItemModal = () => {
        setSelectedMenuItem(null)
        setShowMenuItemButtonModal(false)
    }

    const handlePressNewRestaurantItem = (newRestaurantObj) => {
        setSelectedNewRestaurant(newRestaurantObj)
        setShowNewRestaurantModal(true)
    }

    const handleAddNewRestaurantItem = () => {    
        dispatch(addRestaurant_API(selectedNewRestaurant))
        setSelectedNewRestaurant(null)
        setShowNewRestaurantModal(false)
        setAddNewRestaurantMode(false)
    }

    const handleCloseNewRestaurantModal = () => {
        setSelectedNewRestaurant(null)
        setShowNewRestaurantModal(false)
    }

    const animateTo = async (region, goToCurrent) => {
      if (goToCurrent) {
        let nowLocation = await Location.getLastKnownPositionAsync({});

        const now = {
          longitude: nowLocation.coords.longitude,
          latitude: nowLocation.coords.latitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.01, 
      }

        currentLocation.timing({...now, duration: 1000, useNativeDriver: false}).start()
      } else {
        currentLocation.timing({...region, duration: 1000, useNativeDriver: false}).start()
      }
    }

    const goToUser = () => {
        animateTo(null, true)
    }
    
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const onViewRef = React.useRef(({viewableItems, ...objs}) => {
      if (viewableItems !== undefined) {
        console.log("*********************************************")
        console.log(viewableItems)
        console.log("----------------------------------------------")
        console.log(objs)
        const viewedItem = Object.getOwnPropertyDescriptors(viewableItems[0])
        setRestName({
            restaurantName: viewedItem.item.value.name,
            restaurantID: viewedItem.item.value.id
        })
      }
    })

    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

    const MainBottomSheet = (
        <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        >
        <FlatList data={existingRestaurants}
                  viewabilityConfig = {viewConfigRef.current}
                  onViewableItemsChanged = {onViewRef.current}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({item}) => {
                    return <Restaurant  key={item.id.toString()} 
                                        location= {{longitude: item.longitude, latitude: item.latitude, latitudeDelta: 0.02, longitudeDelta: 0.01}} 
                                        id={item.id} 
                                        animate={animateTo}
                                        addItem={toggleOverlay}
                                        name={item.name} 
                                        address={item.address}
                                        index={index} 
                                        indexToggle={indexToggle} 
                                        key= {item.id.toString()} 
                                        menuItems= {item.menuItem} 
                                        handlePressMenuItem={handlePressMenuItem}
                            />                  
                  }}
                  directionalLockEnabled={true} 
                  decelerationRate={'fast'} 
                  snapToInterval={390} 
                  snapToAlignment={"center"} 
                  automaticallyAdjustContentInsets={false}
                  disableIntervalMomentum horizontal={true} 
                  contentContainerStyle={{ flexDirection: 'row', alignSelf: 'flex-start', minWidth: "100%", minHeight: 250}}>
        </FlatList>
    </BottomSheet>
    )

    const searchBar = (
            <View style={{position: 'absolute', top: 0, width: "100%"}}>                
                <SearchBar  autoCapitalize="none" 
                            lightTheme platform="ios" 
                            placeholder="search for..." 
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            inputContainerStyle={{height: 35}}
                            buttonStyle={{position: 'absolute', right: 10}}
                            inputContainerStyle={{height: 50, alignSelf: 'center', width: "100%", backgroundColor: "silver"}}
                            containerStyle={{height: 50, width:"80%", alignSelf: 'flex-end', borderRadius: 10, top: 45, right: 20, backgroundColor: "silver"}}
                            autoFocus={true}
                            />       
            </View>
    )

    const mapStyleMain = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ]

    const mapStyleAddRestaurant = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]

    return (
        <View>
            <Animated 
                ref={mapView} 
                provider={PROVIDER_GOOGLE} 
                style={styles.map} 
                region={currentLocation} 
                showMyLocationButton={true} 
                showsUserLocation={true} 
                mapPadding={{bottom: 200}} 
                customMapStyle={addNewRestaurantMode ? mapStyleAddRestaurant : mapStyleMain} 
            >
                {Restaurants()}
            </Animated>

            <View style={styles.buttonsRightContainer}>               
                <IconButton
                    iconName="compass"
                    iconColor="blue"
                    iconSize={50}
                    onPress={() => goToUser()}
                />
                <IconButton
                    iconName={addNewRestaurantMode ? "chevron-back-circle" : "add-circle"}
                    iconColor={addNewRestaurantMode ? "blue" : "green"}
                    iconSize={50}
                    onPress={handleChangeMode}
                />
            </View>

            <View style={styles.buttonsLeftContainer}>
                <IconButton
                    iconName="arrow-back"
                    iconColor="#4B5563"
                    iconSize={30}
                    onPress={() => props.navigation.goBack()}
                />               
            </View>

            <Overlay overlayStyle={{borderRadius: 18, minHeight: 380, width: 360}} visible={visible} onBackdropPress={toggleOverlay}>
                <HeaderMediumText style={{margin:10}}>Add a menu item to {restName.restaurantName}!</HeaderMediumText>
                <TextInput
                    label="Name"
                    placeholder="enter the item name!"
                    onChangeText={setFoodName}
                    value={foodName}
                    autoCapitalize="none"
                />
                <TextInput
                    label="Description"
                    placeholder="enter the description!"
                    onChangeText={setFoodDescription}
                    value={foodDescription}
                    autoCapitalize="none"
                />
                <TextInput
                    label="Calories"
                    placeholder="enter the amount of calories!"
                    onChangeText={setFoodCalories}
                    value={foodCalories}
                    autoCapitalize="none"
                />
                <View style={{borderWidth: 0, alignSelf: 'center', flexDirection: 'row', justifyContent:'space-around', alignItems: 'center', width:320, margin: 10}}>
                    <IconButton 
                        buttonStyle={styles.button} 
                        iconSize={23} 
                        buttonColor="#E53E3E" 
                        iconName= "trash" 
                        onPress={handleCloseAddMenuModal}
                    />
                    <IconButton 
                        buttonStyle={styles.button} 
                        iconSize={21} 
                        buttonColor="#319795" 
                        iconName= "save" 
                        onPress={handleAddMenuItem}
                    />
                </View>
            </Overlay>
            {searchBar}

            {addNewRestaurantMode
                ? (<AddNewRestaurantSection 
                    restaurantsFound={restaurantsFound}
                    touched={touched}
                    fetchingData={fetchingData}
                    animateTo={animateTo}
                    handlePressNewRestaurantItem={handlePressNewRestaurantItem}
                />)
                : (MainBottomSheet)
            }

            <MenuItemButtonModal 
                selectedMenuItem={selectedMenuItem}
                modalVisible={showMenuItemButtonModal}
                handleClose={handleCloseMenuItemModal}
                handleConsume={handleConsumeMenuItem}
                handleDelete={handleDeleteMenuItem}
            />

            <NewRestaurantButtonModal
                selectedNewRestaurant={selectedNewRestaurant}
                modalVisible={showNewRestaurantButtonModal}
                handleClose={handleCloseNewRestaurantModal}
                handleAdd={handleAddNewRestaurantItem}
            />
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
    },
    buttonsLeftContainer: {
        position: 'absolute',
        top: 47,
        left: 10
    },
    buttonsRightContainer: {
        position: 'absolute',
        bottom: 400,
        right: 10
    }
})



