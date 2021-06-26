import React, { useEffect, useState } from 'react'
import { Container } from '../../_atoms/Container'
import { SearchBar } from 'react-native-elements'
import { getRecipeList_API } from '../../../_utilities/_api/Recipe'
import { connect } from 'react-redux'
import { FoodItem } from '../../_molecules/FoodItem'
import { store } from '../../../_redux/store/store';
import { getClients_API, addRecipeToMealPlan_API, assignClientMealPlan_API } from '../../../_utilities/_api/Trainer'
import { ScrollView, View, SafeAreaView } from 'react-native'
import { ClientItem } from '../../_molecules/ClientItem'
import { IconButton } from '../../_atoms/Button';

export default function SearchPage (props) {
    const [search, setSearch] = useState("");
    const [list, setList] = useState([]);

    /* The details of the mealPlan */
    const { mealPlan } = props.route.params;

    const handleAddToMealPlan = (foodItem) => {
        let currRecipes = [];
        mealPlan.recipes.forEach(x => currRecipes.push(x.id));
        currRecipes.push(foodItem.id);

        addRecipeToMealPlan_API({ mealPlanID: mealPlan.id, mealPlanTitle: mealPlan.title, recipeIDList: currRecipes })

        props.navigation.goBack();
    }

    const handleAssignToClient = (clientUsername) => {
        assignClientMealPlan_API({ mealPlanID: mealPlan.id, clientUsername })

        props.navigation.goBack();
    }
    
    let searchVariation = props.route.params.variation // ChooseRecipe / ChooseClient

    if (searchVariation === "ChooseRecipe") {
        const preload = () => {
            getRecipeList_API();
            const theRecipes = store.getState().recipe.recipes;
            setList(theRecipes)
        }

        useEffect(preload, []);

        const searchComponents = () => {
                return (list.map( x => {return (<FoodItem key={x.id} itemDetails= {x} title= {x.title} value= {x.calories} setSelectedFoodItem={handleAddToMealPlan}/>)}))
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
                <SafeAreaView style={{ flex: 0.2,flexDirection: 'row', width: "95%", justifyContent: 'flex-start'}}>
                    <IconButton
                    iconName={props.iconName ? props.iconName : "arrow-back"}
                    iconSize={25}
                    iconColor="black"
                    buttonStyle={{ marginLeft: 0 }}
                    onPress={() => props.navigation.goBack()}
                    />
                    <SearchBar autoCapitalize="none" lightTheme platform="ios" containerStyle={{width: "100%", alignSelf:'center', flex:1}} placeholder="search for..." value={search} onChangeText={(text) => onChangeMethod(text)}></SearchBar>
                </SafeAreaView>
                <ScrollView style= {{width: "100%", height: "60%"}} contentContainerStyle= {{ alignItems: 'center'}}>
                    {searchComponents()}
                </ScrollView>
            </Container>
            )

    } else {
        const preload = () => {
            getClients_API()
            const theClients = store.getState().trainer.clients;
            setList(theClients)
        }

        useEffect(preload, []);

        const searchComponents = () => {
                return (list.map( x => {return (<ClientItem key={x.id} clientDetails={x} onPress={() => handleAssignToClient(x.username)} />)}))
        }

        const onChangeMethod = (text) => {
            setSearch(text);
            console.log(text)
            if (text !== "") {
                const theClients = store.getState().trainer.clients;
                const filteredList = theClients.filter(client => client.username.includes(text))
                setList(filteredList)
            } else {
                const theClients = store.getState().trainer.clients;
                setList(theClients)
            }
        }
        return (
            <Container>
                <View style={{ flex: 0.2,flexDirection: 'row', width: "95%", justifyContent: 'flex-start'}}>
                    <IconButton
                    iconName={props.iconName ? props.iconName : "arrow-back"}
                    iconSize={25}
                    iconColor="black"
                    buttonStyle={{ marginLeft: 0 }}
                    onPress={() => props.navigation.goBack()}
                    />
                    <SearchBar autoCapitalize="none" lightTheme platform="ios" containerStyle={{width: "100%", alignSelf:'center', flex:1}} placeholder="search for..." value={search} onChangeText={(text) => onChangeMethod(text)}></SearchBar>
                </View>
                <ScrollView style= {{width: "100%"}} contentContainerStyle= {{ alignItems: 'center'}}>
                    {searchComponents()}
                </ScrollView>
            </Container>
            )
    } 
}
