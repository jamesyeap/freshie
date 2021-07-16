import axios from "axios"

/* ACTION-VERBS */
export const ADD_RESULT = 'PRICE/ADD_RESULT'
export const CLEAR_RESULT = 'PRICE/CLEAR_RESULT'
export const ACKNOWLEDGE_SUCCESS = 'PRICE/ACKNOWLEDGE_SUCCESS'
export const ACKNOWLEDGE_ERROR = 'PRICE/ACKNOWLEDGE_ERROR'
export const SUCCESS = 'PRICE/SUCCESS'
export const ERROR = 'PRICE/ERROR'
export const START_LOADING = 'PRICE/START_LOADING'
export const END_LOADING = 'PRICE/END_LOADING'

/* API-CLIENT */
const url = "https://food-pricer.herokuapp.com/"
// const url = "http://127.0.0.1:5000/ntuc/"

const sendRequest = (searchQuery: string) => {
	return () => axios({
					method: 'post',
					url: url,
					headers: {
						'Content-Type': 'application/json'
					},
					data: { 'query': searchQuery } 
				})
}

/* MIDDLEWARE */
export function searchFoodProduct(searchQuery: string) {
	return async function searchFoodProductThunk(dispatch: any, getState: any) {
		dispatch({ type: START_LOADING })
		try {
			const res = await sendRequest(searchQuery)()

			console.log(res.data.results)

			dispatch({ type: ADD_RESULT, payload: res.data.results })
			dispatch({ type: SUCCESS, success: "Yay we found something!"})
		} catch (err) {
			dispatch({ type: ERROR, error: err.response.status })
		} finally {
			dispatch({ type: END_LOADING })
		}

	}
}


/* ACTION-CREATOR */