import { combineReducers } from 'redux';
import { authReducer } from './Auth.reducer.js';
import { userReducer } from './User.reducer.js';
import { recipesReducer } from './Recipes.reducer.js'
import { trainerReducer } from './Trainer.reducer.js';

export default combineReducers({
	auth: authReducer,
	user: userReducer,
	trainer: trainerReducer,
	recipe: recipesReducer,
});