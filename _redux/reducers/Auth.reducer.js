import { LOADING, ERROR, SAVE_USER, CLEAR_USER, ACKNOWLEDGE } from '../../_redux/actions/Auth.actions';

const initialState = {
	token: null,
	username: null,
	firstName: null,
	lastName: null,
	email: null,
	username: null,
	isPersonalTrainer: null,
	loading: false,
	error: null,
};

export const authReducer = (state = initialState, action) => {
	switch(action.type) {
		case SAVE_USER: 
			return { 
				...state, 
				token: action.payload.key,
				username: action.payload.user.username,
				firstName: action.payload.user.first_name,
				lastName: action.payload.user.last_name,
				email: action.payload.user.email,
				isPersonalTrainer: action.payload.user.isPersonalTrainer,
				loading: false
			};
		case CLEAR_USER:
			return { 
				...state, 
				token: null,
				username: null,
				firstName: null,
				lastName: null,
				email: null,
				isPersonalTrainer: null,
				loading: false
			};
		case LOADING:
			return { 
				...state, 
				loading: true 
			};
		case ERROR:
			return { 
				...state, 
				error: action.error,
				loading: false
			};
		case ACKNOWLEDGE: {
			return {
				...state,
				error: null
			}
		}
		default:
			return state;
	}
}

