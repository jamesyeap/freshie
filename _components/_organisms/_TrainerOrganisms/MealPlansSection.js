import React, { useState } from 'react';
import { FlatList } from 'react-native';
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
		 renderItem={({item}) => <ClientMealPlan id={item.id.toString()} goTo={() => props.navigation.push("MealPlanDetails", { mealPlanDetails: item, clientDetails: props.clientDetails })} mealPlanDetails={item} navigation={props.navigation} />}
		 style={styles}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		 horizontal={props.horizontal ? props.horizontal : false}
		/>
	)
}

export default connect(mapStateToProps)(MealPlansSection)