import React, { useEffect, useState } from 'react'
import { Container } from '../../_atoms/Container'
import { SearchBar } from 'react-native-elements'
import { getRecipeList_API } from '../../../_utilities/_api/Recipe'
import { connect } from 'react-redux'
import { FoodItem } from '../../_molecules/FoodItem'
import { store } from '../../../_redux/store/store';
import { ScrollView } from 'react-native'

export default function SearchPage (props) {
    const [search, setSearch] = useState("");
    const [fixedList, setFixedList] = useState([])
    const [list, setList] = useState([]);

    /* The ID of the Meal Plan selected */
    const { mealPlanID } = props.route.params;

    const handleAddToMealPlan = (foodItemID) => {
        alert(mealPlanID);
        console.log(foodItemID);
    }

    const preload = () => {
        getRecipeList_API();
        const theRecipes = store.getState().recipe.recipes;
        setFixedList(theRecipes);
        setList(theRecipes)
    }

    useEffect(preload, []);

    const searchComponents = () => {
            return (list.map( x => {return (<FoodItem key={x.id} itemDetails={x} title={x.title} value={x.calories} setSelectedFoodItem={handleAddToMealPlan}/>)}))
    }

    const onChangeMethod = (text) => {
        setSearch(text);
        console.log(text)
        if (text !== "") {
            const theRecipes = store.getState().recipe.recipes;
            const filteredList = theRecipes.filter(item => item.title.includes(text))
            setList(filteredList)
        } else {
            const theRecipes = store.getState().recipe.recipes;
            setList(theRecipes)
        }
    }
    
   
    return (
    <Container>
        <ScrollView style= {{width: "100%"}}>
            <SearchBar autoCapitalize="none" lightTheme platform="ios" containerStyle={{width: "90%", alignSelf:'center'}} placeholder="search for..." value={search} onChangeText={(text) => onChangeMethod(text)}></SearchBar>
            {searchComponents()}
        </ScrollView>
    </Container>
    )
}
