import React from 'react';
import styled from 'styled-components';
import { ProgressChart } from 'react-native-chart-kit';
import { BigComponentContainer } from '../_atoms/Container';
import { Info } from '../_molecules/Info';
import { connect } from 'react-redux';

const Container = styled(BigComponentContainer)`
	backgroundColor: #152238;
	padding: 17px;
`;

export const InfoRowContainer = styled.View`
	flexDirection: row;
	justifyContent: space-around;
	alignItems: center;
`;

const CaloriesEatenInfo = (props) => {
	return (<Info
		label="Eaten"
		value={props.value}
		valueColor={"white"}
		unit="kcal"
		/>)
}

const CaloriesLeftInfo = (props) => {
	return (<Info
		label="Left"
		value={props.value}
		valueColor={"white"}
		unit="kcal"
		/>)
}

const chartConfig = {
	   backgroundGradientFrom: "#000000",
	   backgroundGradientFromOpacity: 0,
	   backgroundGradientTo: "#000000",
	   backgroundGradientToOpacity: 0,
	   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      };

const CaloriesPieChartContainer = styled.View`
      flexDirection: column;
      justifyContent: center;
      alignItems: center;
      margin: 15px;
`;

const CaloriesPieChart = (props) => {
	// indicates how much the progress is filled 
	// values must be placed inside an array
	const data = [props.value];

	return (
		<CaloriesPieChartContainer>
			<ProgressChart
			data={data}
			width={148}
			height={148}
			strokeWidth={16}
			radius={60}
			chartConfig={chartConfig}
			hideLegend={true}
			/>
		</CaloriesPieChartContainer>
	)
}

function mapStateToProps(state) {
	const { caloriesConsumed, dailyCalories, consumedMeals } = state.user;
	return { caloriesConsumed, dailyCalories, consumedMeals };
}

export const CalorieTracker = (props) => {
	return (
		<Container>
			<InfoRowContainer>
				<CaloriesEatenInfo value={props.caloriesConsumed} />
				<CaloriesLeftInfo value={props.dailyCalories - props.caloriesConsumed} />
			</InfoRowContainer>
				<CaloriesPieChart value={props.caloriesConsumed / props.dailyCalories} />
		</Container>
	)
}

export default connect(mapStateToProps)(CalorieTracker);
