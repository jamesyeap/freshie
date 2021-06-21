import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../store/store';

export const getRecipes = () => ({
    type: 'GET_RECIPES',
})

export const addRecipes = (recipe) => ({
    type: 'ADD_RECIPES',
    payload: recipe
})