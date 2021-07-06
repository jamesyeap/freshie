import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { HeaderMediumText, RegularText } from '../../_atoms/Text';
import { FAB } from '../../_molecules/FAB';
import CalorieTracker from '../../_organisms/CalorieTracker';
import { SectionButton } from '../../_atoms/Button';
import WeeklyChart from '../../_organisms/WeeklyChart';
import { useDispatch, useSelector } from 'react-redux';
import { createMealPlan_API } from '../../../_redux/actions/Recipes.actions';
import getDateArgument from '../../../_utilities/_helperFunctions/getDateArgument';
import { updateDailyCalories_API, getConsumedMeals_API, getFavouriteMeals_API, getWeeklyConsumedMeals_API, getUserProfile_API } from '../../../_redux/actions/Client.actions';
import { CreateMealPlanModal } from './CreateMealPlanModal';
import AccountPage from '../AccountPage/AccountPage'
import HeaderSection from './HeaderSection'
import AccountHeaderSection from '../AccountPage/HeaderSection';
import { Snackbar } from 'react-native-paper';
import { acknowledge as clientAcknowledge } from '../../../_redux/actions/Client.actions'
import { acknowledge as recipeAcknowledge } from '../../../_redux/actions/Recipes.actions'

// get the height of the user's screen
const { height } = Dimensions.get('window')

export default function HomePage(props) {
	const [loading, setLoading] = useState(true);
	const [showCreateMealPlanModal, setShowCreateMealPlanModal] = useState(false);
	const [newMealPlanName, setNewMealPlanName] = useState("");

	const dispatch = useDispatch();
	const { loading : clientLoading, error : clientError, weeklyCalories, dailyCalories } = useSelector(state => state.client);
	const { loading : recipeLoading, error : recipeError } = useSelector(state => state.recipe);
	const { username } = useSelector(state => state.auth)

	/* Fetch all relevant data */
	const loadData = () => {
		Promise.all(
			dispatch(getWeeklyConsumedMeals_API()),
			dispatch(getConsumedMeals_API({ dateArgument: getDateArgument(), searchOnly: false })),
			dispatch(updateDailyCalories_API()),
			dispatch(getFavouriteMeals_API()),
			dispatch(getUserProfile_API())
		).then(setLoading(false));
	}
	useEffect(loadData, []);

	const handleCreateMealPlan = () => {
		dispatch(createMealPlan_API({ title: newMealPlanName }))
		setNewMealPlanName("");
	}

	const handleCloseCreateMealPlanModal = () => {
		setShowCreateMealPlanModal(false);
		setNewMealPlanName("");
	}

	/* Animation-related variables */
	const scrolling = useRef(new Animated.Value(0)).current

	/* Determines which header to show */
	const translationOne = scrolling.interpolate({
		inputRange: [-height, 0, height],
		outputRange: [-50, 0, -50],
		extrapolate: 'clamp',
	  })
	
	  const translationTwo = scrolling.interpolate({
		inputRange: [0, height, 2 * height],
		outputRange: [-150, 0, -150],
		extrapolate: 'clamp',
	  })
	
	  const translationThree = scrolling.interpolate({
		inputRange: [height, 2 * height, 3 * height],
		outputRange: [-50, 0, -50],
		extrapolate: 'clamp',
	  })
	
	  const translationFour = scrolling.interpolate({
		inputRange: [2 * height, 3 * height, 4 * height],
		outputRange: [-50, 0, -50],
		extrapolate: 'clamp',
	  })

	if (loading) {
		return (
			<Animated.ScrollView>
				<HeaderMediumText>Loading...</HeaderMediumText>
			</Animated.ScrollView>
		)
	}

	return (
		<View style={styles.wrapper}>			

		{/* headers */}
		<AccountHeaderSection translation={translationOne} />
		<HeaderSection translation={translationTwo} />

		<Animated.ScrollView 
		 style={{ ...styles.container, flex: 1 }}
		 onScroll={
			 // updates the variable "scrolling" as user 
			 //		moves down/up the page
			 Animated.event([
				 {
					 nativeEvent: {
						 contentOffset: {
							 y: scrolling
						 }
					 }
				 }
			 ],	{ useNativeDriver: true }
		 )}
		 // onScroll will be run every 16ms
		 scrollEventThrottle={16}

		 // props to make homepage snap to each page
		 decelerationRate={0}
		 snapToInterval={height}
		 snapToAlignment="top"
		>

		<View style={{ height: height }}>
			<AccountPage scrolling={scrolling} />
		</View>

		<View style={{ height: height, flexDirection: 'column', alignItems: 'center'}}>
			<View style={{flex: 0.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
				<CalorieTracker />

				<SectionButton
				mainText="Eating History"
				subText="See what you've been eating"
				margin="21px"
				onPress={() => props.navigation.push("EatingHistory")}
				/>
			</View>

			<View style={{flex: 0.2, marginTop: 50}}>
				<WeeklyChart weeklyCalories={weeklyCalories} dailyCalories={dailyCalories}/>
			</View>
		</View>
	</Animated.ScrollView>
		
		
		<FAB 
		variation="client"
		gotoMeals={() => props.navigation.push("Meals")}
		gotoAddCustomMeal={() => props.navigation.push("EditRecipe", { type: "Add" })}
		gotoAddMealPlan={() => setShowCreateMealPlanModal(true)}
		/>

		<CreateMealPlanModal
		modalVisible={showCreateMealPlanModal}
		handleClose={handleCloseCreateMealPlanModal}
		onPress={handleCreateMealPlan}
		onChangeText={setNewMealPlanName}
		value={newMealPlanName}
		/>

		<Snackbar style={{ backgroundColor: "#60A5FA", marginBottom: 40 }} visible={clientLoading}>Loading</Snackbar>
		<Snackbar 
			style={{ backgroundColor: "#F87171", marginBottom: 40 }}
			visible={clientError}
			onDismiss={() => dispatch(clientAcknowledge())}
			action={{
			label: 'ok',
			onPress: () => {
			dispatch(clientAcknowledge())
			}
			}}
		>
			{clientError}
		</Snackbar>

		<Snackbar style={{ backgroundColor: "#60A5FA", marginBottom: 40 }} visible={recipeLoading}>Loading</Snackbar>
		<Snackbar 
			style={{ backgroundColor: "#F87171", marginBottom: 40 }}
			visible={recipeError}
			onDismiss={() => dispatch(recipeAcknowledge())}
			action={{
			label: 'ok',
			onPress: () => {
			dispatch(recipeAcknowledge())
			}
			}}
		>
			{recipeError}
		</Snackbar>
	</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	container: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
	},
	accountContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 100,
	},
	header: {
		position: 'absolute',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		left: 0,
		right: 0,
		height: 130,
		backgroundColor: "#93C5FD",
		padding: 20
	},
	welcomeContainer: {
		flexDirection: "column",
		paddingLeft: 30
	}
})



/*

export default function SnapToIntervalView(props) {
  const scrolling = useRef(new Animated.Value(0)).current;

  const translationOne = scrolling.interpolate({
    inputRange: [-height, 0, height],
    outputRange: [-100, 0, -100],
    extrapolate: 'clamp',
  })

  const translationTwo = scrolling.interpolate({
    inputRange: [0, height, 2 * height],
    outputRange: [-100, 0, -100],
    extrapolate: 'clamp',
  })

  const translationThree = scrolling.interpolate({
    inputRange: [height, 2 * height, 3 * height],
    outputRange: [-100, 0, -100],
    extrapolate: 'clamp',
  })

  const translationFour = scrolling.interpolate({
    inputRange: [2 * height, 3 * height, 4 * height],
    outputRange: [-100, 0, -100],
    extrapolate: 'clamp',
  })

  return (
    <>
      
      <Animated.View 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          backgroundColor: "tomato",
          transform: [
            { translateY: translationOne }
          ],
          zIndex: 1000,
        }}
      />

      
      <Animated.View 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          backgroundColor: "yellow",
          transform: [
            { translateY: translationTwo }
          ],
          zIndex: 1000,
        }}
      />

      
      <Animated.View 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          backgroundColor: "green",
          transform: [
            { translateY: translationThree }
          ],
          zIndex: 1000,
        }}
      />

      
      <Animated.View 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          backgroundColor: "pink",
          transform: [
            { translateY: translationFour }
          ],
          zIndex: 1000,
        }}
      />

      <Animated.ScrollView
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrolling,
              }
            }
          }
        ],
         { useNativeDriver: true }
        )}
        // onScroll will be run every 16ms
        scrollEventThrottle={16}
        ref={(scrollView) => { scrollView }}
        style={{ 
          flex: 1,
        }}
        decelerationRate={0}
        snapToInterval={height}
        snapToAlignment="top"
      >
        <View style={styles.item1} />
        <View style={styles.item2} />
        <View style={styles.item1} />
        <View style={styles.item2} />

      </Animated.ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  item1: {
    height: height,
    backgroundColor: "blue",
  },
  item2: {
    height: height,
    backgroundColor: "red",
  }
})

*/