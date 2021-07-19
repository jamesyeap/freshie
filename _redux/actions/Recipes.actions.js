import axios from "axios";
import { URL } from '../_constants';

/* ACTION-VERBS */
export const ADD_RECIPE = 'ADD_RECIPE';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_MEAL_PLANS = 'GET_MEAL_PLANS';
export const LOADING = 'RECIPES/LOADING';
export const ERROR = 'RECIPES/ERROR' ;
export const ACKNOWLEDGE = 'RECIPES/ACKNOWLEDGE'

/* MIDDLEWARE */

/* Get a list of recipes for the user */
export const getRecipeList_API = (arg) => {
    return async (dispatch, getState) => {
            // lets user know that the request is loading
            dispatch(loading())

            try {
                    const { username, token } = getState().auth; 

                    if (arg === "search") {
                        const response = await axios({
                            method: 'get',
                            url: `${URL}/api/recipes/search/`,
                            headers: {
                                "Authorization": `Token ${token}`
                            }
                        });

                        dispatch({ type: GET_RECIPES, payload: response.data })
                    }

                    if (arg === "custom") {
                        const response = await axios({
                            method: 'get',
                            url: `${URL}/api/recipes/custom/`,
                            headers: {
                                "Authorization": `Token ${token}`
                            }
                        });
                
                        dispatch({ type: GET_RECIPES, payload: response.data })
                    }
            } catch (e) {
                    // alerts user to an error	
                    dispatch(error(e.message))
            }
    }
}

/* Get a list of meal plans */
export const getMealPlans_API = (arg) => {
    return async (dispatch, getState) => {
            // lets user know that the request is loading
            dispatch(loading())

            try {
                    const { username, token } = getState().auth;
                    const response = await axios({
                        method: 'get',
                        url: `${URL}/api/${username}/mealplans/`,
                        headers: {
                            "Authorization": `Token ${token}`
                        }
                    });

                    dispatch({ type: GET_MEAL_PLANS, payload: response.data });
            } catch (e) {
                    // alerts user to an error	
                    dispatch(error(e.message))
            }
    }
}

/* WORK IN PROGRESS */
/* Get the information about a specific recipe (eg ingredients needed, steps to prepare, etc...) */
export const getRecipeDetails_API = (arg) => {
    return async (dispatch, getState) => {
            // lets user know that the request is loading
            dispatch(loading())

            try {
                    const { username, token } = getState().auth;

            } catch (e) {
                    // alerts user to an error	
                    dispatch(error(e.message))
            }
    }
}

/* Adds a new recipe */
export const addRecipe_API = (arg) => {
    return async (dispatch, getState) => {
            // lets user know that the request is loading
            dispatch(loading())

            try {
                    const { username, token } = getState().auth;

                    const response = await axios({
                        method: 'post',
                        url: `${URL}/api/recipes/`,
                        headers: {
                            "Authorization": `Token ${token}`
                        },
                        data: arg
                    });

                    console.log(response)

                    dispatch(getRecipeList_API("search"))

                    return true;
            } catch (e) {
                    // alerts user to an error	
                    dispatch(error(e.message))
                    console.log(e)

                    return false;
            }
    }
}

/* Edits the recipe (eg ingredients needed, steps to prepare, etc...) */
export const editRecipe_API = (arg) => {
    return async (dispatch, getState) => {
            // lets user know that the request is loading
            dispatch(loading())

            try {
                    const { username, token } = getState().auth;
                    const response = await axios({
                        method: 'post',
                        url: `${URL}/api/recipes/edit/${arg.foodItemID}/`,
                        headers: {
                            "Authorization": `Token ${token}`
                        },
                        data: arg.data
                    })
                    
                    dispatch(getRecipeList_API("search"))
            } catch (e) {
                    // alerts user to an error	
                    dispatch(error(e.message))
            }
    }
}

/* Deletes the recipe */
export const deleteRecipe_API = (arg) => {
    return async (dispatch, getState) => {
            // lets user know that the request is loading
            dispatch(loading())

            try {
                    const { username, token } = getState().auth;
                    const response = await axios({
                        method: 'delete',
                        url: `${URL}/api/recipes/edit/${arg}/`,
                        headers: {
                            "Authorization": `Token ${token}`
                        }
                    });

                    dispatch(getRecipeList_API("custom"))
                    dispatch(getMealPlans_API());
            } catch (e) {
                    // alerts user to an error	
                    dispatch(error(e.message))
            }
    }
}

/* Create a new meal plan */
export const createMealPlan_API = (arg) => {
    return async (dispatch, getState) => {
            // lets user know that the request is loading
            dispatch(loading())

            try {
                    const { username, token } = getState().auth;
                    const response = await axios({
                        method: 'post',
                        url: `${URL}/api/${username}/add-mealplan/`,
                        headers: {
                            "Authorization": `Token ${token}`
                        },
                        data: arg
                    });

                    dispatch(getMealPlans_API());
            } catch (e) {
                    // alerts user to an error	
                    dispatch(error(e.message))
            }
    }
}

/* Replace the recipes in a meal plan with an array of recipes
	-> "meals" to be given in an array 
*/
export const addRecipeToMealPlan_API = (arg) => {
    return async (dispatch, getState) => {
            // lets user know that the request is loading
            dispatch(loading())

            try {
                    const { username, token } = getState().auth;

                    const response = await axios({
                        method: 'post',
                        url: `${URL}/api/${username}/mealplan/${arg.mealPlanID}/`,
                        headers: {
                              "Authorization": `Token ${token}`
                        },
                        data: {
                            title: arg.mealPlanTitle,
                            meals: arg.recipeIDList
                        }
                    });
                    
                    dispatch(getMealPlans_API());
            } catch (e) {
                    // alerts user to an error	
                    dispatch(error(e.message))
            }
    }
}

/* Delete meal plan */
export const deleteMealPlan_API = (arg) => {
    return async (dispatch, getState) => {
            // lets user know that the request is loading
            dispatch(loading())

            try {
                const { username, token } = getState().auth;
                const response = await axios({
                    method: 'delete',
                    url: `${URL}/api/${username}/mealplan/${arg}/`,
                    headers: {
                            "Authorization": `Token ${token}`
                    },
                });
                
                dispatch(getMealPlans_API());
            } catch (e) {
                    // alerts user to an error	
                dispatch(error(e.message))
            }
    }
}

/* ACTION-CREATORS */
export const getRecipes = (recipes) => ({
    type: GET_RECIPES,
    payload: recipes
})

export const addRecipes = (recipe) => ({
    type: ADD_RECIPE,
    payload: recipe
})

export const getMealPlans = (mealPlans) => ({
    type: GET_MEAL_PLANS,
    payload: mealPlans
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