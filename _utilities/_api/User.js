import axios from 'axios';
import { store } from '../../_redux/store/store';
import { updateCaloriesConsumed, updateDailyCalories, updateConsumedMeals, loading, error, updateFavouriteMeals, updateWeeklyCalories } from '../../_redux/actions/User.actions';
import { URL } from './_constants';

/* Get a list of meals consumed for the day */
export async function getConsumedMeals_API(values, searchOnly) {
	try {
		console.log("Fetching consumed meals...")
		const { token, username } = store.getState().auth;

		store.dispatch(loading(true));
		//console.log(values);

		const response = await axios({
    			method: 'post',
    			url: `${URL}/api/${username}/consumed-meals/`,
    			headers: {
      				"Authorization": `Token ${token}`
    			}, 
				data: values
		});
		//console.log("here")
		//console.log(response)
		
		/* Destructure the data received */
		let consumedMealsArray = [];

		if (response.data !== "") {
			response.data.forEach(element => {
				let newMeal = element.meal;
				newMeal.id = element.id;
				consumedMealsArray.push(newMeal);
			});
		}

		store.dispatch(updateConsumedMeals(consumedMealsArray));
		console.log("Successfully fetched consumed meals!");
		if (!searchOnly) {
			// Calculates the new amount of total calories consumed from the new array of consumed meals
			console.log("Updating calories consumed...")
			async function countCalories() { 
				if (consumedMealsArray.length === 0) {
					return 0;
				} else {
					let temp = 0; 

					for (let i = 0; i < consumedMealsArray.length; i++) {
						temp += consumedMealsArray[i].calories;
					}

					return temp;
				}
			}

			const newCaloriesConsumed = await countCalories();

			store.dispatch(updateCaloriesConsumed(newCaloriesConsumed));

			console.log("Successfully updated calories consumed!")
			store.dispatch(loading(false));
		} else {
			store.dispatch(loading(false));	
		}

		
	} catch (e) {
		alert(e.response.data)
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
    			url: `${URL}/api/${username}/add-consumed-meal/`,
    			headers: {
      				"Authorization": `Token ${token}`
    			},
			data: values
		});

		console.log("Successfully added a consumed meal!");
		//console.log(response.data);
		store.dispatch(loading(false));
		const today = new Date();
		const dateArgument = {
			day: today.getDate(),
			month: today.getMonth() + 1,
			year: today.getFullYear()
		}
		await getConsumedMeals_API(dateArgument, false);
	} catch (e) {
		store.dispatch(loading(false));
		store.dispatch(error(e.response.status))
		console.log(e.response.status);

		alert(e.response.data)
	}
}

/* Updates the maximum amount of calories that a user can eat per day */
export async function updateDailyCalories_API() {
	try {
		console.log("Updating daily calories...")

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
		alert(e.response.data)
	}
}

/* Deletes the consumed meal from the record */
export async function deleteConsumedMeal_API(values) {

	try {
		console.log(`Deleting the consumed meal: ${values}`)

		const { token, username } = store.getState().auth;
		store.dispatch(loading(true));

		const response = await axios({
    			method: 'delete',
    			url: `${URL}/api/${username}/consumed-meal/${values}/`,
    			headers: {
      				"Authorization": `Token ${token}`
    			}
		});

		console.log("Successfully deleted the consumed meal!");

		store.dispatch(loading(false));
		const today = new Date();
		const dateArgument = {
			day: today.getDate(),
			month: today.getMonth() + 1,
			year: today.getFullYear()
		}
		await getConsumedMeals_API(dateArgument, false);
	} catch (e) {
		alert(e.response.data)
	}
}

export async function getFavouriteMeals_API() {
	try {

		console.log("Getting favourite meals...")

		const { token, username } = store.getState().auth
		store.dispatch(loading(true))

		const response = await axios({
			method: 'get',
			url: `${URL}/api/${username}/fav-meals/`,
			headers: {
				"Authorization": `Token ${token}`	
			}
		})

		console.log("Got favourite meals")
		store.dispatch(loading(false))

		let favMeals = []
		if (response.data !== "You have not added any favourties!") {
			response.data.forEach(meal => {
				favMeals.push(meal.meal)
			})
		}
		store.dispatch(updateFavouriteMeals(favMeals))
		console.log("added favourite meals!")	
	} catch (e) {
		alert(e.response.data)
	}
}

export async function deleteFavouriteMeal_API(id) {
	try {
		console.log("Deleting favourite meal...")

		const { token, username } = store.getState().auth
		store.dispatch(loading(true))

		const response = await axios({
			method: 'delete',
			url: `${URL}/api/${username}/fav-meals/${id}`,
			headers: {
				"Authorization": `Token ${token}`	
			}
		})

		console.log("Successfully deleted favourite meal!")
		store.dispatch(loading(false))

		await getFavouriteMeals_API()
	} catch (e) {
		alert(e.response.data)
	}	
}

export async function getWeeklyConsumedMeals_API(values) {
	try {
		console.log("getting weekly calories...")

		const { token, username } = store.getState().auth
		//console.log(store.getState().user.loading)
		store.dispatch(loading(true))
		//console.log(store.getState().user.loading)

		axios({
			method: 'post',
			url: `${URL}/api/${username}/weeklyCalories/`,
			headers: {
				"Authorization": `Token ${token}`
			},
			data: values
		}).then(response => {
			const res = response.data
			while(res.length < 7) {
				res.push(0)
			}
			//console.log("dispatching...")
			store.dispatch(updateWeeklyCalories(res))
			//console.log("dispatched...")
		})
		//console.log(response.data)
		console.log("successfully got weekly calories!")
		
	} catch (e) {
		alert(e.response.data)	
	}
}