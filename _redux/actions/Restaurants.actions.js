import axios from "axios"
import { URL } from '../_constants'
import { getConsumedMeals_API, getWeeklyConsumedMeals_API } from "./Client.actions"
import getDateArgument from '../../_utilities/_helperFunctions/getDateArgument';

/* ACTION-VERBS */
export const ADD_RESTAURANT = 'ADD_RESTAURANT';
export const GET_RESTAURANTS = 'GET_RESTAURANTS';
export const ADD_MENU_ITEM = 'ADD_MENU_ITEM';
export const LOADING = 'RESTAURANT/LOADING';
export const ERROR = 'RESTAURANT/ERROR' ;
export const ACKNOWLEDGE = 'RESTAURANT/ACKNOWLEDGE'

/* MIDDLEWARE */
export const getRestaurants_API = (arg) => {
    return async (dispatch, getState) => {
        dispatch(loading())

        try {
            const { username, token } = getState().auth;
            
            const response = await axios({
                method: 'get',
                url: `${URL}/api/${username}/restaurants/`,
                headers: {
                    "Authorization": `Token ${token}`
                }
            })

            dispatch({type: GET_RESTAURANTS, payload: response.data})
        } catch (e) {
            dispatch(error(e.message))
        }
    }
}

export const addRestaurant_API = (arg) => {
    return async (dispatch, getState) => {
        dispatch(loading())

        try {
            const { username, token } = getState().auth

            const response = await axios({
                method: 'post',
                url: `${URL}/api/${username}/restaurants/`,
                headers: {
                    "Authorization": `Token ${token}`
                },
                data: arg
            })

            await dispatch(getRestaurants_API())
        } catch (e) {
            dispatch(error(e.message))
            alert(e.message)
        }
    }
}

export const addMenuItem_API = (arg) => {
    return async (dispatch, getState) => {

        dispatch(loading())

        try {
            const { username, token } = getState().auth
            const response = await axios({
                method: 'post',
                url: `${URL}/api/${username}/menu-items/`,
                headers: {
                    "Authorization": `Token ${token}`
                },
                data: arg
            })
            
            await dispatch(getRestaurants_API())
        } catch (e) {
            dispatch(error(e.message))
        }
    }
}

// arg = {
//    id
// }
export const deleteMenuItem_API = (arg) => {
    return async (dispatch, getState) => {
        dispatch(loading())

        try {
            const { username, token } = getState().auth

            const response = await axios({
                method: 'delete',
                url: `${URL}/api/${username}/menu-items/`,
                headers: {
                    "Authorization": `Token ${token}`
                },
                data: arg
            })

            await dispatch(getRestaurants_API())
        } catch (e) {
            dispatch(error(e.message))
        }
    }
}

// Adds a meal to the record for the day when the user eats something 
export const consumeMenuItem_API = (arg) => {
    return async (dispatch, getState) => {
            // lets user know that the request is loading
            dispatch(loading())

            try {
                    const { username, token } = getState().auth;

                    const response = await axios({
                            method: 'post',
                            url: `${URL}/api/${username}/add-consumed-meal/`,
                            headers: {
                                      "Authorization": `Token ${token}`
                            },
                            data: arg
                    })

                    dispatch(getConsumedMeals_API({ dateArgument: getDateArgument() }));
                    dispatch(getWeeklyConsumedMeals_API());
            } catch (e) {
                    // alerts user to an error	
                    console.log(e)
                    dispatch(error(e.message))
            }
    }
}

/* ACTION-CREATORS */
export const getRestaurants = (restaurants) => ({
    type: GET_RESTAURANT,
    payload: restaurants
})

export const addRestaurant= (restaurant) => ({
    type: ADD_RESTAURANT,
    payload: restaurant
})

export const addMenuItem = (menuItem) => ({
    type: ADD_MENU_ITEM,
    payload: menuItem
})

export const loading = () => ({
    type: LOADING
});

export const error = error => ({
    type: ERROR,
    error: error,
});

export const acknowledge = () => ({
    type: ACKNOWLEDGE
})