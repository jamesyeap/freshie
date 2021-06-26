import axios from 'axios';
import { store } from '../../_redux/store/store';
import { getClients, getReferralCode, loading, error } from '../../_redux/actions/Trainer.actions';
import { getRecipeList_API, getMealPlans_API } from './Recipe';
import { URL } from './_constants';

/* Gets a list of clients under the personal trainer and load it into the "Trainer" store */
export async function getClients_API(values) {
	try {
		console.log("Fetching list of clients...")
		const { token, username } = store.getState().auth;

		store.dispatch(loading(true));
		console.log(values);

		const response = await axios({
    			method: 'get',
    			url: `${URL}/api/${username}/clients/`,
    			headers: {
      				"Authorization": `Token ${token}`
    			}, 
		});

		store.dispatch(loading(false));
		console.log(response.data);
		
		store.dispatch(getClients(response.data));
		console.log("Successfully fetched list of clients!");
	} catch (e) {
		if (e.response) {
			store.dispatch(loading(false));
			store.dispatch(error(e.response.data))
			console.log(e.response);
		} else {
			console.log(e.request)
		}
	}
}

// view -> client's data (GET)
export async function getClientData_API(values) {
	try {
		console.log("Fetching client data...")
		const { token, username } = store.getState().auth;

		store.dispatch(loading(true));
		console.log(values);

		const response = await axios({
    			method: 'get',
    			url: `${URL}/api/${username}/client/${values}/view/`,
    			headers: {
      				"Authorization": `Token ${token}`
    			}, 
		});

		store.dispatch(loading(false));
		console.log(response.data);
		
		console.log("Successfully fetched client information!");

		return (response.data);
	} catch (e) {
		if (e.response) {
			store.dispatch(loading(false));
			store.dispatch(error(e.response.data))
			console.log(e.response);
		} else {
			console.log(e.request)
		}
	}c
}

// meal-plans -> get client's assigned meal-plans (GET)
export async function getClientMealPlan_API(values) {
	try {
		console.log("Fetching client's meal plans...")
		const { token, username } = store.getState().auth;

		store.dispatch(loading(true));
		console.log(values);

		const response = await axios({
    			method: 'get',
    			url: `${URL}/api/${username}/client/${values}/meal-plans/`,
    			headers: {
      				"Authorization": `Token ${token}`
    			}, 
		});

		store.dispatch(loading(false));
		console.log(response.data);
		
		console.log("Successfully fetched client meal plans!");

		return (response.data);
	} catch (e) {
		if (e.response) {
			store.dispatch(loading(false));
			store.dispatch(error(e.response.data))
			console.log(e.response);
		} else {
			console.log(e.request)
		}
	}
}

// remove -> remove client (DELETE)
export async function deleteClient_API(values) {
	try {
		console.log("Removing client...")
		const { token, username } = store.getState().auth;

		store.dispatch(loading(true));
		console.log(values);

		const response = await axios({
    			method: 'delete',
    			url: `${URL}/api/${username}/client/${values}/remove/`,
    			headers: {
      				"Authorization": `Token ${token}`
    			}
		});

		store.dispatch(loading(false));
		console.log(response.data);
		
		console.log("Successfully removed client!");

		await getClients_API();
	} catch (e) {
		if (e.response) {
			store.dispatch(loading(false));
			store.dispatch(error(e.response.data))
			console.log(e.response);
		} else {
			console.log(e.request)
		}
	}
}

// assign-meal-plan -> assign a meal plan to the client (POST)
/*
	2 inputs: 
	 -> clientUsername
	 -> mealPlanID
*/
export async function assignClientMealPlan_API(values) {
	try {
		console.log("Assigning meal plan to client...")
		const { token, username } = store.getState().auth;

		store.dispatch(loading(true));
		console.log(values);

		const response = await axios({
    			method: 'post',
    			url: `${URL}/api/${username}/client/${values.clientUsername}/assign-meal-plan/`,
    			headers: {
      				"Authorization": `Token ${token}`
    			}, 
			data: {
				mealPlanID: values.mealPlanID
			}
		});

		store.dispatch(loading(false));
		alert(response.data);
		
		console.log("Successfully assigned meal plan to client!");

		await getClients_API();
	} catch (e) {
		if (e.response) {
			store.dispatch(loading(false));
			store.dispatch(error(e.response.data))
			console.log(e.response);
		} else {
			console.log(e.request)
		}
	}
}

// remove-meal-plan -> remove client's meal-plan (DELETE)
/*
	2 inputs: 
	 -> clientUsername
	 -> mealPlanID
*/
export async function deleteClientMealPlan_API(values) {
	console.log(values);

	try {
		console.log("Removing meal plan from client...")
		const { token, username } = store.getState().auth;

		store.dispatch(loading(true));
		console.log(values);

		const response = await axios({
    			method: 'delete',
    			url: `${URL}/api/${username}/client/${values.clientUsername}/remove-meal-plan/`,
    			headers: {
      				"Authorization": `Token ${token}`
    			}, 
			data: {
				mealPlanID: values.mealPlanID,
			}
		});

		store.dispatch(loading(false));
		console.log("Successfully removed meal plan from client!");

		getClients_API();
	} catch (e) {
		if (e.response) {
			store.dispatch(loading(false));
			store.dispatch(error(e.response.data))
			console.log(e.response);
		} else {
			console.log(e.request)
		}
	}
}

// Get referral code of Personal Trainer
export async function getReferralCode_API() {
	try {
		console.log("Getting referral code for personal trainer...")
		const { token, username } = store.getState().auth;

		store.dispatch(loading(true));

		const response = await axios({
    			method: 'get',
    			url: `${URL}/api/${username}/`,
    			headers: {
      				"Authorization": `Token ${token}`
    			}
		});

		store.dispatch(loading(false));
		console.log(response.data);
		store.dispatch(getReferralCode(response.data.referralCode))
		
		console.log("Successfully fetched referral code!");
	} catch (e) {
		if (e.response) {
			store.dispatch(loading(false));
			store.dispatch(error(e.response.data))
			console.log(e.response);
			console.log("ERROR")
		} else {
			console.log(e.request)
			console.log("ERROR")
		}
	}
}

// Assign a recipe to a meal plan
/* "meals" to be given in an array */
export async function addRecipeToMealPlan_API(values) {
	try {
		console.log("Adding recipe to meal plan...")
		console.log(values);
		const { token, username } = store.getState().auth;

		store.dispatch(loading(true));

		const response = await axios({
    			method: 'post',
    			url: `${URL}/api/${username}/mealplan/${values.mealPlanID}/`,
    			headers: {
      				"Authorization": `Token ${token}`
    			},
			data: {
				title: values.mealPlanTitle,
				meals: values.recipeIDList
			}
		});

		store.dispatch(loading(false));
		console.log(response.data);
		
		console.log("Successfully added recipe to meal plan!!");
		await getMealPlans_API();
	} catch (e) {
		if (e.response) {
			store.dispatch(loading(false));
			store.dispatch(error(e.response.data))
			console.log(e.response);
			console.log("ERROR")
		} else {
			console.log(e.request)
			console.log("ERROR")
		}
	}	
}