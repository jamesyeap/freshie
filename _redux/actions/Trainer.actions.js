
import axios from "axios";
import { URL } from '../_constants';
import { getMealPlans_API, getRecipeList_API } from "./Recipes.actions";
import { store } from '../store/store'

/* ACTION-VERBS */
export const FETCH_CLIENTS = 'FETCH_CLIENTS'
export const FETCH_REFERRAL_CODE = 'FETCH_REFERRAL_CODE';
export const LOADING = 'TRAINER/LOADING'
export const ERROR = 'TRAINER/ERROR'
export const ACKNOWLEDGE = 'TRAINER/ACKNOWLEDGE'

/* MIDDLEWARE */
export const getClients_API = () => {
    return async (dispatch, getState) => {
            // lets user know that the request is loading
            dispatch(loading())

            try {
                    const { username, token } = getState().auth;
                    const response = await axios({
                        method: 'get',
                        url: `${URL}/api/${username}/clients/`,
                        headers: {
                                  "Authorization": `Token ${token}`
                        }, 
                        });

                        dispatch({ type: FETCH_CLIENTS, payload: response.data })
            } catch (e) {
                    // alerts user to an error	
                    dispatch(error(e.message))
            }
    }
}

export const deleteClient_API = (arg) => {
    return async (dispatch, getState) => {
            // lets user know that the request is loading
            dispatch(loading())

            try {
                const { username, token } = getState().auth;


		const response = await axios({
                        method: 'delete',
                        url: `${URL}/api/${username}/client/${arg}/remove/`,
                        headers: {
                                  "Authorization": `Token ${token}`
                        }
                });

                dispatch(getClients_API());

            } catch (e) {
                    // alerts user to an error	
                    dispatch(error(e.message))
            }
    }
}

export const assignClientMealPlan_API = (arg) => {
    return async (dispatch, getState) => {
            // lets user know that the request is loading
            dispatch(loading())

            try {
                    const { username, token } = getState().auth;

                    const response = await axios({
                        method: 'post',
                        url: `${URL}/api/${username}/client/${arg.clientUsername}/assign-meal-plan/`,
                        headers: {
                                  "Authorization": `Token ${token}`
                        }, 
                        data: {
                            mealPlanID: arg.mealPlanID
                        }
                        });
            } catch (e) {
                    // alerts user to an error	
                    dispatch(error(e.message))
            }
    }
}

export const deleteClientMealPlan_API = (arg) => {
    return async (dispatch, getState) => {
            // lets user know that the request is loading
            dispatch(loading())

            try {
                    const { username, token } = getState().auth;

                    const response = await axios({
                        method: 'delete',
                        url: `${URL}/api/${username}/client/${arg.clientUsername}/remove-meal-plan/`,
                        headers: {
                                  "Authorization": `Token ${token}`
                        }, 
                        data: {
                            mealPlanID: arg.mealPlanID,
                        }
                    });

                    dispatch(getClients_API())
            } catch (e) {
                    // alerts user to an error	
                    dispatch(error(e.message))
            }
    }
}

export const getReferralCode_API = (arg) => {
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

                dispatch({ type: FETCH_REFERRAL_CODE, payload: response.data.referralCode })
            } catch (e) {
                    // alerts user to an error	
                    dispatch(error(e.message))
            }
    }
}

export const updateClientTargetCalories_API = (arg) => {
        return async (dispatch, getState) => {
                // lets user know that the request is loading
                dispatch(loading())
                
                try {
                        const { username, token } = getState().auth;
    
                        const response = await axios({
                            method: 'post',
                            url: `${URL}/api/${username}/client/${arg.clientUsername}/edit-calories/`,
                            headers: {
                                      "Authorization": `Token ${token}`
                            },
                            data: {
                                calories: arg.targetCalories
                            }
                            });    
                            
                            await dispatch(getClients_API())
                } catch (e) {
                        // alerts user to an error	
                        dispatch(error(e.message))
                }
        }
    }

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

                        dispatch(getRecipeList_API("custom"))
                        dispatch(getMealPlans_API());
            } catch (e) {
                    // alerts user to an error	
                    dispatch(error(e.message))
            }
    }
}

/* ACTION-CREATORS */
export const getClients = listOfClients => {
	return {
		type: FETCH_CLIENTS,
		payload: listOfClients
	};
}

export const getReferralCode = referralCode => {
	return {
		type: FETCH_REFERRAL_CODE,
		payload: referralCode
	}
}

export const loading = boolean => {
	return {
		type: LOADING,
		payload: boolean
	}
}

export const error = error => {
	return {
		type: ERROR,
		error: error
	}
}

export const acknowledge = () => ({
        type: ACKNOWLEDGE,
})

/* OTHER FUNCTIONS THAT ARE NOT PART OF REDUX */
// view -> client's data (GET)
export async function getClientData_API(values) {
                try {
                        const { token, username } = store.getState().auth;
                        console.log(token)

                        const response = await axios({
                                method: 'get',
                                url: `${URL}/api/${username}/client/${values}/view/`,
                                headers: {
                                        "Authorization": `Token ${token}`
                                }, 
                        });

                        console.log(response.data)
                        return response.data;
                } catch (e) {
                        console.log(e.response.data)
                        alert(e.response.data)
                }
}

// Gets a list of meal-plans for a client 
export async function getClientMealPlan_API(values) {
                try {
                        const { token, username } = store.getState().auth;
                        console.log(token)

                        const response = await axios({
                                method: 'get',
                                url: `${URL}/api/${username}/client/${values}/meal-plans/`,
                                headers: {
                                        "Authorization": `Token ${token}`
                                }, 
                        });

                        console.log(response.data)
                        return response.data;
                } catch (e) {
                        console.log(e.response.data)
                        alert(e.response.data)
                }
}



