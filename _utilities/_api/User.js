export const URL = "http://freshie-api.herokuapp.com"
import axios from 'axios';
import { store } from '../../_redux/store/store';
import { updateCaloriesConsumed, updateDailyCalories, updateConsumedMeals, loading, error } from '../../_redux/actions/User.actions';

/* Get a list of meals consumed for the day */
export async function getConsumedMeals_API() {
	try {
		console.log("Fetching consumed meals...")

		const { token, username } = store.getState().auth;
		store.dispatch(loading(true));

		const response = await axios({
    			method: 'get',
    			url: `${URL}/api/${username}/consumed-meals/`,
    			headers: {
      				"Authorization": `Token ${token}`
    			}
		});

		console.log(response.data);
		store.dispatch(updateConsumedMeals(response.data));
		console.log("Successfully fetched consumed meals!");

		// Calculates the new amount of total calories consumed from the new array of consumed meals
		console.log("Updating calories consumed...")
		const { consumedMeals } = store.getState().user;

		async function countCalories() { 
			let temp = 0; 

			for (let i = 0; i < props.consumedMeals.length; i++) {
				temp += props.consumedMeals[i].calories;
			}
		}

		const newCaloriesConsumed = await countCalories();
		updateCaloriesConsumed(newCaloriesConsumed);
		console.log("Successfully updated calories consumed!")

		store.dispatch(loading(false));
	} catch (e) {
		store.dispatch(loading(false));
		store.dispatch(error(e.response))
		console.log(e.response);
	}
}

/* Adds a meal to the record for the day when the user eats something */
export async function addConsumedMeal_API(values) {
	try {
		console.log("Adding a consumed meal...")
		console.log(values);

		const { token, username } = store.getState().auth;
		store.dispatch(loading(true));

		const response = await axios({
    			method: 'post',
    			url: `${URL}/api/${username}/add-consumed-meals/`,
    			headers: {
      				"Authorization": `Token ${token}`
    			},
			data: {
				"recipeID": values
			}
		});

		console.log("Successfully added a consumed meal!");
		store.dispatch(loading(false));

		await getConsumedMeals_API();
	} catch (e) {
		store.dispatch(loading(false));
		store.dispatch(error(e.response.status))
		console.log(e.response.status);
	}
}

/* Updates the maximum amount of calories that a user can eat per day */
export async function updateDailyCalories_API() {
	try {
		console.log("Updating daily calories...")
		console.log();

		const { token, username } = store.getState().auth;
		store.dispatch(loading(true));

		const response = await axios({
    			method: 'get',
    			url: `${URL}/api/${username}/calories/`,
    			headers: {
      				"Authorization": `Token ${token}`
    			}
		});

		store.dispatch(updateDailyCalories(response.data.dailyCalories))
		store.dispatch(loading(false));
		console.log("Successfully updated daily calories!");
	} catch (e) {
		store.dispatch(loading(false));
		store.dispatch(error(e.response.status))
		console.log(e.response.data);
	}
}

/* 	****** IN-PROGRESS ******
	// Edits the attribute for a specific meal consumed in the record (e.g calories, date eaten, etc...) 
export async function editConsumedMeal_API(values) {
	try {
		console.log("Editing the consumed meal...")

		const { token, username } = store.getState().auth;
		store.dispatch(loading(true));

		const response = await axios({
    			method: 'get',
    			url: `${URL}/api/${username}/consumed-meals/`,
    			headers: {
      				"Authorization": `Token ${token}`
    			}
		});

		console.log("Successfully edited consumed meal!");
		store.dispatch(loading(false));

		await (getConsumedMeals_API());
	} catch (e) {
		store.dispatch(loading(false));
		store.dispatch(error(e.response.statusMessage))
		console.log(e.response.statusMessage);
	}
}
*/

/* Deletes the consumed meal from the record */
export async function deleteConsumedMeal_API(values) {
	try {
		console.log("Deleting the consumed meal...")

		const { token, username } = store.getState().auth;
		store.dispatch(loading(true));

		const response = await axios({
    			method: 'delete',
    			url: `${URL}/api/${username}/consumed-meals/${values}/`,
    			headers: {
      				"Authorization": `Token ${token}`
    			}
		});

		console.log("Successfully deleted the consumed meal!");

		store.dispatch(loading(false));
		await getConsumedMeals_API();
	} catch (e) {
		store.dispatch(loading(false));
		store.dispatch(error(e.response.statusMessage))
		console.log(e.response.statusMessage);
	}
}