const initialState = {
	caloriesConsumed: 0,
	dailyCalories: 2000,
	consumedMeals: [{
		id: 0,
		title: "Egg Sandwich",
		calories: 500,
		instructions: "Just make lah bro.",
		ingredients: "Egg. Bread. What more do you want sia."
	}],
	loading: false,
	error: null,
}

/* mock example
const data = [
	{
		id: 0,
		title: "Egg Sandwich",
		calories: 500,
		instructions: "Just make lah bro.",
		ingredients: "Egg. Bread. What more do you want sia."
	}
]
*/

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_CALORIES_CONSUMED':
			return {...state, caloriesConsumed: action.payload};
		case 'UPDATE_DAILY_CALORIES':
			return {...state, dailyCalories: action.payload};
		case 'UPDATE_CONSUMED_MEALS':
			return {...state, consumedMeals: action.payload};
		case 'LOADING': 
			return {...state, loading: action.payload};
		case 'ERROR':
			return {...state, error: action.payload};
		default:
			return state;
	}
}