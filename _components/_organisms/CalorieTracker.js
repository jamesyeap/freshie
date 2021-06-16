import React from 'react';
import styled from 'styled-components';
import { ProgressChart } from 'react-native-chart-kit';
import { BigComponentContainer } from '../_atoms/Container';
import { Info } from '../_molecules/Info';

const Container = styled(BigComponentContainer)`
	backgroundColor: #F4F4F4;
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
		value={500}
		unit="kcal"
		/>)
}

const CaloriesLeftInfo = (props) => {
	return (<Info
		label="Left"
		value={2500}
		unit="kcal"
		/>)
}

// indicates how much the progress is filled 
// values must be placed inside an array
const data = [0.6];

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

export const CalorieTracker = (props) => {
	return (
		<Container>
			<InfoRowContainer>
				<CaloriesEatenInfo />
				<CaloriesLeftInfo />
			</InfoRowContainer>
				<CaloriesPieChart />
		</Container>
	)
}
