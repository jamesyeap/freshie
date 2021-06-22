// ACTION CREATORS

/* Updates calories consumed for the day */
export const updateCaloriesConsumed = caloriesConsumed => {
	return {
		type: 'UPDATE_CALORIES_CONSUMED',
		payload: caloriesConsumed
	}
}

/* Changes the maximum amount of calories that a client can consume per day */
export const updateDailyCalories = newDailyCalories => {
	return {
		type: 'UPDATE_DAILY_CALORIES',
		payload: newDailyCalories
	}
}

/* Updates the record of meals the user has consumed for the day */ 
export const updateConsumedMeals = consumedMealsList => {
	return {
		type: 'UPDATE_CONSUMED_MEALS',
		payload: consumedMealsList
	}
}

/* Indicates loading status */
export const loading = bool => {
	return {
		type: 'LOADING',
		payload: bool
	}
}

/* Determines what error message to display in the popup (if any are encountered) */
export const error = error => {
	return {
		type: 'ERROR',
		payload: error
	}
}
