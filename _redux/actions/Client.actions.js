import axios from "axios";
import { URL } from '../_constants';
import countCaloriesConsumed from '../../_utilities/_helperFunctions/calculateCaloriesConsumed'
import getDateArgument from '../../_utilities/_helperFunctions/getDateArgument';

/* ACTION-VERBS */
export const UPDATE_CALORIES_CONSUMED = 'UPDATE_CALORIES_CONSUMED'
export const UPDATE_DAILY_CALORIES = 'UPDATE_DAILY_CALORIES'
export const UPDATE_WEEKLY_CALORIES = 'UPDATE_WEEKLY_CALORIES'
export const UPDATE_CONSUMED_MEALS = 'UPDATE_CONSUMED_MEALS'
export const UPDATE_FAVOURITE_MEALS = 'UPDATE_FAVOURITE_MEALS'
export const UPDATE_PERSONAL_TRAINER = 'UPDATE_PERSONAL_TRAINER'
export const LOADING = 'CLIENT/LOADING'
export const ERROR = 'CLIENT/ERROR'
export const ACKNOWLEDGE = 'CLIENT/ACKNOWLEDGE'
        
/* MIDDLEWARE */
// Gets a list of all the meals that the user has consumed in the past
export const getConsumedMeals_API = (arg) => {
        return async (dispatch, getState) => {
                // lets user know that the request is loading
                dispatch(loading())

                try {
                        const { username, token } = getState().auth;
                        const response = await axios({
                                method: 'post',
                                url: `${URL}/api/${username}/consumed-meals/`,
                                headers: {
                                          "Authorization": `Token ${token}`
                                }, 
                                    data: arg.dateArgument
                            });

                        /* De-structure the data received */
                        let consumedMealsArray = [];
                        console.log(response.data)
                        if (response.data !== "") {
                                response.data.forEach(element => {
                                        /*
                                        let newMeal = element.meal;
                                        newMeal.id = element.id;
                                        consumedMealsArray.push(newMeal);
                                        */

                                        let newMeal = {}
                                        newMeal['id'] = element.id
                                        newMeal['title'] = element.meal
                                        newMeal['calories'] = element.calories
                                        consumedMealsArray.push(newMeal)
                                });
                        }

                        dispatch({ type: UPDATE_CONSUMED_MEALS, payload: consumedMealsArray })
                        
                        if (!arg.searchOnly) {
                                // Calculate the new amount of total calories consumed 
                                //      from the new array of consumed meals               
                                const newCaloriesConsumed = countCaloriesConsumed(consumedMealsArray);
                                
                                dispatch( { type: UPDATE_CALORIES_CONSUMED, payload: newCaloriesConsumed })
                        }
                } catch (e) {
                        // alerts user to an error	
                        dispatch(error(e.message))
                }
        }
}

// Adds a meal to the record for the day when the user eats something 
export const addConsumedMeal_API = (arg) => {
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
                        });

                        dispatch(getConsumedMeals_API({ dateArgument: getDateArgument() }));
                        dispatch(getWeeklyConsumedMeals_API());
                } catch (e) {
                        // alerts user to an error	
                        console.log(e)
                        dispatch(error(e.message))
                }
        }
}


// Updates the maximum amount of calories that a user can eat per day 
export const updateDailyCalories_API = (arg) => {
        return async (dispatch, getState) => {
                // lets user know that the request is loading
                dispatch(loading())

                try {
                        const { username, token } = getState().auth;

                        const response = await axios({
                                method: 'patch',
                                url: `${URL}/api/${username}/calories/`,
                                headers: {
                                          "Authorization": `Token ${token}`
                                },
                                data: {
                                        dailyCalories: arg
                                }
                        });

                        dispatch({ type: UPDATE_DAILY_CALORIES, payload: response.data.dailyCalories })
                } catch (e) {
                // alerts user to an error	
                dispatch(error(e.message))

                }
        }
}

// Get user profile details 
export const getUserProfile_API = () => {
        return async (dispatch, getState) => {
                // lets user know that the request is loading
                dispatch(loading())

                try {
                        const { username, token } = getState().auth;

                        const response = await axios({
                                method: 'get',
                                url: `${URL}/api/${username}/`,
                                headers: {
                                          "Authorization": `Token ${token}`
                                }
                        });

                        if (response.data.personalTrainer) {
                                // if user has a personal trainer, update his account page with the name of his/her personal trainer
                                dispatch({ type: UPDATE_PERSONAL_TRAINER, payload: response.data.personalTrainer.username })
                        }

                } catch (e) {
                // alerts user to an error	
                dispatch(error(e.message))
                }
        }
}

// Deletes the consumed meal from the record 
export const deleteConsumedMeal_API = (arg) => {
        return async (dispatch, getState) => {
                // lets user know that the request is loading
                dispatch(loading())

                try {
                        const { username, token } = getState().auth;

                        const response = await axios({
                                method: 'delete',
                                url: `${URL}/api/${username}/consumed-meal/${arg}/`,
                                headers: {
                                          "Authorization": `Token ${token}`
                                }
                        });

                        await dispatch(getConsumedMeals_API({ dateArgument: getDateArgument(), searchOnly: false }));
                        await dispatch(getWeeklyConsumedMeals_API());
                } catch (e) {
                // alerts user to an error	
                dispatch(error(e.message))
                }
        }
}

export const getWeeklyConsumedMeals_API = (arg) => {
        return async (dispatch, getState) => {
                // lets user know that the request is loading
                dispatch(loading())

                try {
                        const { username, token } = getState().auth;

                        const getDateArray = () => {
                                const todate = new Date()// Sun Jun 27 2021 16:16:23 GMT+0800 (Singapore Standard Time)
                                const today = todate.getDay() // 0 (sunday)
                                const result = []
                                for (let i = today; i >= 0; i--) {
                                        let currentDay = new Date(todate)
                                        currentDay.setDate(currentDay.getDate() - i)
                                        let value = {
                                                day: currentDay.getDate(),
                                                month: currentDay.getMonth() + 1,
                                                year: currentDay.getFullYear()
                                        }
                                        result.push(value)
                                }
                                return result
                        }
        
                        const response = await axios({
                                method: 'post',
                                url: `${URL}/api/${username}/weekly-calories/`,
                                headers: {
                                        "Authorization": `Token ${token}`
                                },
                                data: getDateArray()
                        })

                        const res = response.data;
                        while(res.length < 7) {
                                res.push(0)
                        }

                        dispatch({ type: UPDATE_WEEKLY_CALORIES, payload: res })
                } catch (e) {
                // alerts user to an error	
                dispatch(error(e.response.message))
                alert(e.message)
                }
        }
}

export const getFavouriteMeals_API = () => {
        return async (dispatch, getState) => {
                // lets user know that the request is loading
                dispatch(loading())

                try {
                        const { username, token } = getState().auth;

                        const response = await axios({
                                method: 'get',
                                url: `${URL}/api/${username}/fav-meals/`,
                                headers: {
                                        "Authorization": `Token ${token}`	
                                }
                        })

                        if (response.status === 204) {
                                dispatch({ type: UPDATE_FAVOURITE_MEALS, payload: []})
                        } else {
                                dispatch({ type: UPDATE_FAVOURITE_MEALS, payload: response.data })
                        }
                } catch (e) {
                // alerts user to an error	
                dispatch(error(e.response.message))

                }
        }
}

export const addFavouriteMeal_API = (arg) => {
        return async (dispatch, getState) => {
                // lets user know that the request is loading
                dispatch(loading())

                try {
                        const { username, token } = getState().auth;

                        const response = await axios({
                                method: 'post',
                                url: `${URL}/api/${username}/add-fav-meal/`,
                                headers: {
                                        "Authorization": `Token ${token}`	
                                },
                                data: { recipeID: arg }
                        })

                        await dispatch(getFavouriteMeals_API())
                } catch (e) {
                // alerts user to an error	
                alert(e)
                dispatch(error(e.response.message))

                }
        }
}

export const deleteFavouriteMeal_API = (arg) => {
        return async (dispatch, getState) => {
                // lets user know that the request is loading
                dispatch(loading())

                try {
                        const { username, token } = getState().auth;

                        const response = await axios({
                                method: 'delete',
                                url: `${URL}/api/${username}/fav-meal/${arg}/`,
                                headers: {
                                        "Authorization": `Token ${token}`	
                                }
                        })

                        await dispatch(getFavouriteMeals_API());
                } catch (e) {
                // alerts user to an error	
                dispatch(error(e.response.message))
                }
        }
}

export const addPersonalTrainer_API = (arg) => {
        return async (dispatch, getState) => {
                // lets user know that the request is loading
                dispatch(loading())
                        
                try {
                        const { username, token } = getState().auth

                        const response = await axios({
                                method: 'post',
                                url: `${URL}/api/${username}/add-personal-trainer/`,
                                headers: {
                                        "Authorization": `Token ${token}`	
                                },
                                data: {
                                        referralCode: arg
                                }
                        })

                        await dispatch(getUserProfile_API())
                } catch (e) {
                        dispatch(error(e.response.message))
                }
        }
}

/* ACTION-CREATORS */

/* Updates calories consumed for the day */
export const updateCaloriesConsumed = caloriesConsumed => {
        return {
                type: 'UPDATE_CALORIES_CONSUMED',
                payload: caloriesConsumed
        }
}

/* Changes the maximum amount of calories that a client can consume per day */
export const updateDailyCalories = newDailyCalories => {
        return {
                type: 'UPDATE_DAILY_CALORIES',
                payload: newDailyCalories
        }
}

export const updateWeeklyCalories = newWeeklyCalories => {
        return {
                type: 'UPDATE_WEEKLY_CALORIES',
                payload: newWeeklyCalories
        }
}

/* Updates the record of meals the user has consumed for the day */ 
export const updateConsumedMeals = consumedMealsList => {
        return {
                type: 'UPDATE_CONSUMED_MEALS',
                payload: consumedMealsList
        }
}

export const updateFavouriteMeals = favouriteMealsList => {
        return {
                type: 'UPDATE_FAVOURITE_MEALS',
                payload: favouriteMealsList
        }
}

export const updatePersonalTrainer = personalTrainer => {
        return {
                type: 'UPDATE_PERSONAL_TRAINER',
                payload: personalTrainer 
        }
}

/* Indicates loading status */
export const loading = () => {
        return {
                type: ERROR,
        }
}

/* Determines what error message to display in the popup (if any are encountered) */
export const error = error => {
        return {
                type: ERROR,
                error: error
        }
}

export const acknowledge = () => ({
        type: ACKNOWLEDGE,
})
