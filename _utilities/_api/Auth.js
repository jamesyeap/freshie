export const URL = "http://freshie-api.herokuapp.com"
import axios from 'axios';
import { store } from '../../_redux/store/store';
import { getToken, saveUser, removeToken, loading, error } from '../../_redux/actions/Auth.actions';

// LOG IN
export async function loginAsync(values) {
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
        store.dispatch(loading(false));
        console.log(e)
        alert(e.response.status);
    }
}

// SIGN UP
export async function signupAsync(values) {
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
        console.log(e)
        alert(e.response.status);
    }
}

/* LOG OUT (in progress)
export async function logoutAsync(values) {
    try {
        store.dispatch(loading(true));

    } catch (e) {

    }
}
*/



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


