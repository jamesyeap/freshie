/* State management for "CLIENT" */

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
}

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_CALORIES_CONSUMED':
			return {...state, caloriesConsumed: action.payload};
		case 'UPDATE_DAILY_CALORIES':
			return {...state, dailyCalories: action.payload};
		case 'UPDATE_WEEKLY_CALORIES':
			return {...state, weeklyCalories: action.payload};
		case 'UPDATE_CONSUMED_MEALS':
			return {...state, consumedMeals: action.payload};
		case 'UPDATE_FAVOURITE_MEALS':
			return {...state, favouriteMeals: action.payload};
		case 'LOADING': 
			return {...state, loading: action.payload};
		case 'ERROR':
			return {...state, error: action.payload};
		default:
			return state;
	}
}