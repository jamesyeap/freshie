/* State management for "PERSONAL TRAINER" */
const initialState = {
	clients: null,
	referralCode: null,
	loading: false,
	error: false
}

export const trainerReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_CLIENTS':
			return {...state, clients: action.payload};
		case 'FETCH_REFERRAL_CODE':
			return {...state, referralCode: action.payload};
		case 'LOADING': 
			return {...state, loading: action.payload};
		case 'ERROR':
			return {...state, error: action.payload}
		default:
			return state;
	}
}