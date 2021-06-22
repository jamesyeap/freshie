
export const URL = "http://freshie-api.herokuapp.com"
import axios from 'axios';
import { store } from '../../_redux/store/store';
import { loading, getRecipes } from '../../_redux/actions/Recipes.actions';

/* Get a list of recipes for the user */
export async function getRecipeList_API() {
	try {
		const { token, username } = store.getState().auth;
		console.log("Fetching list of recipes...");

		store.dispatch(loading(true));

		const response = await axios({
			method: 'get',
			url: `${URL}/api/recipes/`,
			headers: {
				"Authorization": `Token ${token}`
			}
		});

		console.log(response.data);
		console.log("Successfully fetched list of recipes!")

		store.dispatch(getRecipes(response.data));
		store.dispatch(loading(false));
	} catch (e) {
		store.dispatch(loading(false));
		store.dispatch(error(e.response.statusMessage))
		console.log(e.response.statusMessage)
	}
};

/* Get the information about a specific recipe (eg ingredients needed, steps to prepare, etc...) */
export async function getRecipeDetails_API(values) {

}; 

/* Adds a new recipe */
export async function addRecipe_API(values) {
	
}

/* Edits the recipe (eg ingredients needed, steps to prepare, etc...) */
export async function editRecipe_API(values) {

};

/* Deletes the recipe */
export async function deleteRecipe_API(values) {

}
