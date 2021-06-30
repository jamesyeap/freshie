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

export const updateWeeklyCalories = newWeeklyCalories => {
	return {
		type: 'UPDATE_WEEKLY_CALORIES',
		payload: newWeeklyCalories
	}
}

/* Updates the record of meals the user has consumed for the day */ 
export const updateConsumedMeals = consumedMealsList => {
	return {
		type: 'UPDATE_CONSUMED_MEALS',
		payload: consumedMealsList
	}
}

export const updateFavouriteMeals = favouriteMealsList => {
	return {
		type: 'UPDATE_FAVOURITE_MEALS',
		payload: favouriteMealsList
	}
}

export const updatePersonalTrainer = personalTrainer => {
	return {
		type: 'UPDATE_PERSONAL_TRAINER',
		payload: personalTrainer 
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
