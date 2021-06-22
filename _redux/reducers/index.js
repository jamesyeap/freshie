import { combineReducers } from 'redux';
import { authReducer } from './Auth.reducer.js';
import { userReducer } from './User.reducer.js';
import { recipesReducer } from './Recipes.reducer.js'

export default combineReducers({
	auth: authReducer,
	user: userReducer,
	recipe: recipesReducer,
});