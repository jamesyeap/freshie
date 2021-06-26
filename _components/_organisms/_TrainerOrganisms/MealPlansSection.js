import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import { ClientMealPlan } from '../../_molecules/ClientMealPlan'
import { connect } from 'react-redux';

function mapStateToProps(state) {
	const { mealPlans } = state.recipe;
	return { mealPlans };
}

function MealPlansSection (props) {
	const styles = props.style ? props.style : { backgroundColor: "#CCD7E0", width: 355, height: 740, borderRadius: 10 };

	const data = props.mealPlans.filter(x => props.assignedMealPlansID.includes(x.id));

	return (
		<FlatList
		 data={data}
		 renderItem={({item}) => <ClientMealPlan id={item.id} goTo={() => props.navigation.push("MealPlanDetails", { mealPlanDetails: item, clientDetails: props.clientDetails })} mealPlanDetails={item} navigation={props.navigation} />}
		 style={styles}
		 contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
		 horizontal={props.horizontal ? props.horizontal : false}
		/>
	)
}

export default connect(mapStateToProps)(MealPlansSection)