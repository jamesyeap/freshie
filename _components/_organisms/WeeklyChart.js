import React from 'react'
import { BarChart } from 'react-native-chart-kit'
import { Dimensions, View, SafeAreaView } from "react-native";
import { Container } from '../_atoms/Container';
import { column } from 'stylis';

const screenWidth = Dimensions.get("window").width;

export const WeeklyChart = (props) => {
    const chartConfig = {
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientTo: "#FFFFFF",
        backgroundGradientToOpacity: 0,
        fillShadowGradientFrom: "#000000",
        fillShadowGradientTo: "#000000",
        fillShadowGradientOpacity: 1,
        barPercentage: 0.1,
        barRadius: 3,
    };
      
    const data = {
        labels: ["M", "T", "W", "T", "F", "S", "S"],
        datasets: [
          {
            data: [300, 2000, 500, 1300, 1200, 1800, 700],
            colors: [
                (opacity = 1) => 300 > 1800 ? "#DD3F3F" : "#C8FD9E", 
                (opacity = 1) => 2000 > 1800 ? "#DD3F3F" : "#C8FD9E", 
                (opacity = 1) => 500 > 1800 ? "#DD3F3F" : "#C8FD9E",
                (opacity = 1) => 1300 > 1800 ? "#DD3F3F" : "#C8FD9E",
                (opacity = 1) => 1200 > 1800 ? "#DD3F3F" : "#C8FD9E",
                (opacity = 1) => 1800 > 1800 ? "#DD3F3F" : "#C8FD9E",
                (opacity = 1) => 700 > 1800 ? "#DD3F3F" : "#C8FD9E",
            ]
          }
        ],
      };      
    return (
        <SafeAreaView style= {{flex: 0.2, flexDirection: 'column', justifyContent: 'center', alignSelf: 'center'}}>
            <View style={{ borderWidth:0, width: 320}}>
                <BarChart
                data={data}
                height={160}
                width={320}
                withHorizontalLabels= {false}
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                showBarTops={false}
                showValuesOnTopOfBars={true}
                withInnerLines={false}
                withCustomBarColorFromData={true}
                flatColor={true}
                style={{ borderWidth: 1, borderColor: "#E2E8F0", paddingRight: 40, paddingBottom: 5, borderRadius: 10}}
            />
        </View>
        </SafeAreaView>
    )
}