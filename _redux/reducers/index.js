import { combineReducers } from 'redux';
import { authReducer } from './Auth.reducer.js';
import { clientReducer } from './Client.reducer.js';
import { recipesReducer } from './Recipes.reducer.js'
import { trainerReducer } from './Trainer.reducer.js';

export default combineReducers({
	auth: authReducer,
	client: clientReducer,
	trainer: trainerReducer,
	recipe: recipesReducer,
});