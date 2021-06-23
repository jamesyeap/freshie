// export const URL = "http://freshie-api.herokuapp.com"
const URL = "http://192.168.86.24:8000";
import axios from 'axios';
import { store } from '../../_redux/store/store';
import { getToken, saveUser, removeToken, loading, error } from '../../_redux/actions/Auth.actions';

/* Logs the user in */
export async function loginAsync_API(values) {
    try {
        console.log(values);
        
        store.dispatch(loading(true));

        const response = await axios({
            method: 'post',
            url: `${URL}/login/`,
            data: values
        });

        console.log(response.data)
        store.dispatch(saveUser(response.data));
        store.dispatch(loading(false));
    } catch (e) {
        alert(e);
        store.dispatch(loading(false));
        store.dispatch(error(e.response));
        console.log(e.response.statusMessage);
    }
}

/* Signs up a new user */
export async function signupAsync_API(values) {
    console.log(values.dailyCalories);

    try {
        console.log(values);

        store.dispatch(loading(true));

        const response = await axios({
            method: 'post',
            url: `${URL}/register/`,
            data: values
        });

        console.log(response.data);
        store.dispatch(saveUser(response.data));
        store.dispatch(loading(false));
    } catch (e) {
        store.dispatch(loading(false));
        console.log(e.response.statusMessage)
        store.dispatch(error(e.response.statusMessage))
    }
}

/* Logs the existing user out */
export async function logoutAsync_API(values) {
    try {
        store.dispatch(loading(true));
        store.dispatch(removeToken());
        store.dispatch(loading(false));
    } catch (e) {
        store.dispatch(loading(false));
        store.dispatch(error(e.response.statusMessage))


    }
}




/* EXAMPLE FROM 
	https://blog.logrocket.com/patterns-for-data-fetching-in-react-981ced7e5c56/

async fetchUsersAsync() {
        try {
            this.setState({...this.state, isFetching: true});
            const response = await axios.get(USER_SERVICE_URL);
            this.setState({users: response.data, isFetching: false});
        } catch (e) {
            console.log(e);
            this.setState({...this.state, isFetching: false});
        }
    };
fetchUsers = this.fetchUsersAsync;
*/


