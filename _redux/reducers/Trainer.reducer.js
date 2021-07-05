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
			return {...state, clients: action.payload, loading: false };
		case 'FETCH_REFERRAL_CODE':
			return {...state, referralCode: action.payload, loading: false };
		case 'LOADING': 
			return {...state, loading: true };
		case 'ERROR':
			return {...state, error: action.payload}
		default:
			return state;
	}
}
