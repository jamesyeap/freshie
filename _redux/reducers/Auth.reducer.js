const initialState = {
	token: null,
	loading: false,
	error: null,
};

export const authReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'GET_TOKEN':
			return { ...state, token: action.token };
		case 'SAVE_TOKEN':
			return { ...state, token: action.token };
		case 'REMOVE_TOKEN':
			return { ...state, token: null };
		case 'LOADING':
			return { ...state, loading: action.isLoading };
		case 'ERROR':
			return { ...state, error: action.error };
		default:
			return state;
	}
	
}