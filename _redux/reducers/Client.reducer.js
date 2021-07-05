/* State management for "CLIENT" */

import { 
	UPDATE_CALORIES_CONSUMED, 
	UPDATE_DAILY_CALORIES,
	UPDATE_WEEKLY_CALORIES,
	UPDATE_CONSUMED_MEALS,
	UPDATE_FAVOURITE_MEALS,
	UPDATE_PERSONAL_TRAINER,
	LOADING,
	ERROR,
} from "../actions/Client.actions";

const initialState = {
	caloriesConsumed: 0,
	dailyCalories: 2000,
	weeklyCalories: [0,0,0,0,0,0,0],
	consumedMeals: [{
		id: 0,
		title: "Egg Sandwich",
		calories: 500,
		instructions: "Just make lah bro.",
		ingredients: "Egg. Bread. What more do you want sia."
	}],
	favouriteMeals:[],
	loading: false,
	error: null,
	personalTrainer: null
}

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_CALORIES_CONSUMED:
			return {...state, caloriesConsumed: action.payload, loading: false };
		case UPDATE_DAILY_CALORIES:
			return {...state, dailyCalories: action.payload, loading: false };
		case UPDATE_WEEKLY_CALORIES:
			return {...state, weeklyCalories: action.payload, loading: false };
		case UPDATE_CONSUMED_MEALS:
			return {...state, consumedMeals: action.payload, loading: false };
		case UPDATE_FAVOURITE_MEALS:
			return {...state, favouriteMeals: action.payload, loading: false };
		case UPDATE_PERSONAL_TRAINER:
			return {...state, personalTrainer: action.payload, loading: false };
		case LOADING: 
			return {...state, loading: true};
		case ERROR:
			return {...state, error: action.payload, loading: false };
		default:
			return state;
	}
}