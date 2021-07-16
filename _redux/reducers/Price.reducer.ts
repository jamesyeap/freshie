import { 
	ADD_RESULT, 
	CLEAR_RESULT,
	ACKNOWLEDGE_SUCCESS,
	ACKNOWLEDGE_ERROR,
	SUCCESS,
	ERROR,
	START_LOADING,
	END_LOADING
} from '../actions/Price.actions'

export type FoodProduct = {
	title: string;
	price: number;
	measurement: number;
	link: string;
	supermarket: string;
}

type Action = {
	type: string;
	payload?: any;
	success?: string;
	error?: string;
}

interface PriceReducerState {
	searchQuery: string | null;
	results: Array<FoodProduct> | null;
	loading: boolean;
	success: string | null;
	error: string | null;
}

const initialState: PriceReducerState = {
	searchQuery: null,
	results: null,
	loading: false,
	success: null,
	error: null
}

export default function PriceReducer(state = initialState, action: Action) {
	switch (action.type) {
		case ADD_RESULT:
			return {
				...state,
				results: action.payload
			}
		case CLEAR_RESULT:
			return {
				...state,
				results: null
			}
		case SUCCESS:
			return {
				...state,
				success: action.success
			}
		case ACKNOWLEDGE_SUCCESS:
			return {
				...state,
				success: null
			}
		case ERROR:
			return {
				...state,
				error: action.error
			}
		case ACKNOWLEDGE_ERROR:
			return {
				...state,
				error: null
			}
		case START_LOADING:
			return {
				...state,
				loading: true
			}
		case END_LOADING:
			return {
				...state,
				loading: false
			}
		default:
			return state
	}
}