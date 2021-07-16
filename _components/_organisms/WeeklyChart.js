import React from 'react'
import { useSelector } from 'react-redux';
import { BarChart } from 'react-native-chart-kit'
import { View, SafeAreaView } from "react-native";

export default function WeeklyChart(props) {
    const chartConfig = {
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0,
        fillShadowGradientFrom: "transparent",
        fillShadowGradientTo: "transparent",
        fillShadowGradientOpacity: 0,
        barPercentage: 0.5,
        barRadius: 3,
    };
    const { weeklyCalories, dailyCalories } = useSelector(state => state.client)
    const data = {
        labels: [ "S", "M", "T", "W", "T", "F", "S"],
        datasets: [
          {
            data: weeklyCalories,
            colors: [
                (opacity = 1) => weeklyCalories[0] > dailyCalories ? "#DD3F3F" : `#006633`, 
                (opacity = 1) => weeklyCalories[1] > dailyCalories ? "#DD3F3F" : `#006633`,
                (opacity = 1) => weeklyCalories[2] > dailyCalories ? "#DD3F3F" : `#006633`,
                (opacity = 1) => weeklyCalories[3] > dailyCalories ? "#DD3F3F" : `#006633`, 
                (opacity = 1) => weeklyCalories[4] > dailyCalories ? "#DD3F3F" : `#006633`,
                (opacity = 1) => weeklyCalories[5] > dailyCalories ? "#DD3F3F" : `#006633`,
                (opacity = 1) => weeklyCalories[6] > dailyCalories ? "#DD3F3F" : '#006633',
            ]
          }
        ],
      };     

    return (
        <SafeAreaView style= {{flex: 0.2, flexDirection: 'column', justifyContent: 'center', alignSelf: 'center'}}>
            <View style={{ borderWidth:0, width: 300, flexDirection: 'row', justifyContent: 'center'}}>
                <BarChart
                data={data}
                height={180}
                width={280}
                withHorizontalLabels= {false}
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                showBarTops={false}
                showValuesOnTopOfBars={true}
                withInnerLines={false}
                withCustomBarColorFromData={true}
                flatColor={true}
                style={{ borderWidth: 1, borderColor: "#E2E8F0", paddingRight: 20, paddingBottom: 5, borderRadius: 10}}
            />
        </View>
        </SafeAreaView>
    )
}