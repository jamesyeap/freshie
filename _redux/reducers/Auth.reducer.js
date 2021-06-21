const initialState = {
	token: null,
	username: null,
	firstName: null,
	lastName: null,
	email: null,
	loading: false,
	error: null,
};

export const authReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'GET_TOKEN':
			return { ...state, token: action.token };
		case 'SAVE_USER':
			return { ...state, 
				token: action.payload.key,  
				username: action.payload.user.username,
				firstName: action.payload.user.first_name,
				lastName: action.payload.user.last_name,
				email: action.payload.user.email 
			};
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