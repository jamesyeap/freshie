import { combineReducers } from 'redux';
import { authReducer } from './Auth.reducer.js';

export default combineReducers({
	token: authReducer
});