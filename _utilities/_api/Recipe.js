
import axios from 'axios';
import { store } from '../../_redux/store/store';
import { loading, getRecipes, getMealPlans, error } from '../../_redux/actions/Recipes.actions';
import { URL } from './_constants';

/* Get a list of recipes for the user */
export async function getRecipeList_API(variant) {
	try {
		const { token, username } = store.getState().auth;
		console.log("Fetching list of recipes...");

		store.dispatch(loading(true));

		if (variant === "search") {
			const response = await axios({
				method: 'get',
				url: `${URL}/api/recipes/search/`,
				headers: {
					"Authorization": `Token ${token}`
				}
			});

			//console.log(response.data);
			console.log("Successfully fetched list of recipes!")

			store.dispatch(getRecipes(response.data));
			store.dispatch(loading(false));
		}
		if (variant === "custom") {
			const response = await axios({
				method: 'get',
				url: `${URL}/api/recipes/custom/`,
				headers: {
					"Authorization": `Token ${token}`
				}
			});

			//console.log(response.data);
			console.log("Successfully fetched list of recipes!")

			store.dispatch(getRecipes(response.data));
			store.dispatch(loading(false));	
		}

	} catch (e) {
		store.dispatch(loading(false));
		store.dispatch(error(e.response.statusMessage))
		console.log(e.response.statusMessage)
	}
};

/* Get a list of meal plans */
export async function getMealPlans_API(values) {
	try {
		const { token, username } = store.getState().auth;
		console.log("Fetching list of meal plans...");

		store.dispatch(loading(true));

		const response = await axios({
			method: 'get',
			url: `${URL}/api/${username}/mealplans/`,
			headers: {
				"Authorization": `Token ${token}`
			}
		});

		console.log(response.data);
		console.log("Successfully fetched list of meal plans!")

		store.dispatch(getMealPlans(response.data));
		store.dispatch(loading(false));
	} catch (e) {
		store.dispatch(loading(false));
		store.dispatch(error(e.response.statusMessage))
		console.log(e.response.statusMessage)
	}	
}

/* Get the information about a specific recipe (eg ingredients needed, steps to prepare, etc...) */
export async function getRecipeDetails_API(values) {

}; 

/* Adds a new recipe */
export async function addRecipe_API(values) {
	try {
		const { token, username } = store.getState().auth;
		console.log("Adding recipe...");

		store.dispatch(loading(true));

		const response = await axios({
			method: 'post',
			url: `${URL}/api/recipes/`,
			headers: {
				"Authorization": `Token ${token}`
			},
			data: values
		});

		console.log(response.data);
		console.log("Successfully added recipe!")

		store.dispatch(getMealPlans(response.data));
		store.dispatch(loading(false));
	} catch (e) {
		store.dispatch(loading(false));
		store.dispatch(error(e.response.statusMessage))
		console.log(e.response.statusMessage)
	}
}

/* Edits the recipe (eg ingredients needed, steps to prepare, etc...) */
export async function editRecipe_API(values) {

};

/* Deletes the recipe */
export async function deleteRecipe_API(values) {
	try {
		const { token, username } = store.getState().auth;
		console.log("Deleting recipe...");

		store.dispatch(loading(true));

		const response = await axios({
			method: 'delete',
			url: `${URL}/api/recipes/${values}/`,
			headers: {
				"Authorization": `Token ${token}`
			}
		});

		console.log(response.data);
		console.log("Successfully deleted recipe!")

		store.dispatch(getMealPlans(response.data));
		store.dispatch(loading(false));
	} catch (e) {
		store.dispatch(loading(false));
		console.log(e.response.data.detail)
		store.dispatch(error(e.response.data.detail))
	}
}
