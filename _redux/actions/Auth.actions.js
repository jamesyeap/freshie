import axios from "axios";
import { URL } from '../_constants';

/* ACTION-VERBS */
export const SAVE_USER = 'SAVE_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const LOADING = 'AUTH/LOADING';
export const ERROR = 'AUTH/ERROR';
export const ACKNOWLEDGE = 'AUTH/ACKNOWLEDGE'

/* MIDDLEWARE */
export const loginAsync_API = (arg) => {
    return async (dispatch, getState) => {

        // lets user know that the request is loading
        dispatch(loading())

        try {
            const response = await axios({
                method: "post",
                url: `${URL}/login/`,
                data: arg
            })

            // if request is successful, saves user details in state
            dispatch({ type: SAVE_USER, payload: response.data })
        } catch (e) {
            // alerts user to an error
            dispatch(error(e.response.data.non_field_errors))
        }
    }
}

export const logoutAsync_API = () => {
    return async (dispatch, getState) => {

        // lets user know that the request is loading
        dispatch(loading())

        try {
            await axios({
                method: "post",
                url: `${URL}/logout/`,
            })

            // if request is successful, clears user details from the state
            dispatch({ type: CLEAR_USER })
        } catch (e) {
            // alerts user to an error
            console.log(e.message)
            dispatch(error(e.message))
        }
    }
}

export const signupAsync_API = (arg) => {
    return async (dispatch, getState) => {
        // lets user know that the request is loading
        dispatch(loading())

        try {
            const response = await axios({
                method: "post",
                url: `${URL}/register/`,
                data: arg
            })

            // if request is successful, saves user details in state
            dispatch({ type: SAVE_USER, payload: response.data })
        } catch (e) {
            // alerts user to an error
            console.log(e.response)
            dispatch(error(e.response.data))
        }
    }
}

/* ACTION-CREATORS */
export const loading = () => ({
    type: LOADING,
});

export const acknowledge = () => ({
    type: ACKNOWLEDGE,
})

export const error = error => ({
    type: ERROR,
    error: error,
});


