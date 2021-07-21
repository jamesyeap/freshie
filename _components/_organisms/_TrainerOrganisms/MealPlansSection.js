import React from 'react';
import { FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import { ClientMealPlan } from '../../_molecules/ClientMealPlan'
import { connect } from 'react-redux';

function mapStateToProps(state) {
	const { mealPlans } = state.recipe;
	return { mealPlans };
}

function MealPlansSection (props) {
	const styles = props.style ? props.style : { backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 };

	return (
		<FlatList
		 data={props.data}
		 renderItem={({item}) => <ClientMealPlan key={item.id.toString()} id={item.id.toString()} goTo={() => props.navigation.push("MealPlanDetails", { mealPlanDetails: item, clientDetails: props.clientDetails })} mealPlanDetails={item} navigation={props.navigation} />}
		 style={styles}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		 horizontal={props.horizontal ? props.horizontal : false}
		 keyExtractor = { (item, index) => index.toString() }
		 ListEmptyComponent={<Text style={styles.listEmptyText}>Client has no meal plan!</Text>}
		/>
	)
}

export default connect(mapStateToProps)(MealPlansSection)

const styles = StyleSheet.create({
	listEmptyText: {
		fontFamily: 'Inter_500Medium',	
		fontSize: 18,
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center'
	}
})