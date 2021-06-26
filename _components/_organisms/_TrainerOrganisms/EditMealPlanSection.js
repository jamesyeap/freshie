import React from "react";
import styled from 'styled-components';
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar } from "react-native";
import { MediumText } from "../../_atoms/Text";
import { FoodItem } from "../../_molecules/FoodItem";

const MealTypeText = styled(MediumText)`
	fontSize: 16px;
	lineHeight: 24px;
	marginLeft: 15px;
	backgroundColor: #FFFFFF;
`;

const DATA = [
  {
    title: "Breakfast",
    data: ["Pizza", "Burger", "Risotto"]
  },
  {
    title: "Lunch",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
  },
  {
    title: "Dinner",
    data: ["Water", "Coke", "Beer"]
  }
];

export const EditMealPlanSection = (props) => (
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <FoodItem title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <MealTypeText>{title}</MealTypeText>
      )}
    />
);

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  paddingTop: StatusBar.currentHeight,
	  marginHorizontal: 16
	},
	item: {
	  backgroundColor: "#f9c2ff",
	  padding: 20,
	  marginVertical: 8
	},
	header: {
	  fontSize: 32,
	  backgroundColor: "#fff"
	},
	title: {
	  fontSize: 24
	}
      });
      