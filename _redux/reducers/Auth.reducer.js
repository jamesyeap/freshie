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
		case 'GET_TOKEN':
			return { ...state, token: action.payload };
		case 'SAVE_USER':
			return { ...state, 
				token: action.payload.key,  
				username: action.payload.user.username,
				firstName: action.payload.user.first_name,
				lastName: action.payload.user.last_name,
				email: action.payload.user.email,
				isPersonalTrainer: action.payload.user.isPersonalTrainer
			};
		case 'REMOVE_TOKEN':
			return { ...state, token: null };
		case 'LOADING':
			return { ...state, loading: action.payload };
		case 'ERROR':
			return { ...state, error: action.payload };
		default:
			return state;
	}
	
}