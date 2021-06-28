import axios from 'axios';
import { store } from '../../_redux/store/store';
import { getToken, saveUser, removeToken, loading, error } from '../../_redux/actions/Auth.actions';
import { URL } from './_constants';

/* Logs the user in */
export async function loginAsync_API(values) {
    try {
        //console.log(values);
        
        store.dispatch(loading(true));

        const response = await axios({
            method: 'post',
            url: `${URL}/login/`,
            data: values
        });

        //console.log(response.data)
        store.dispatch(saveUser(response.data));
        store.dispatch(loading(false));
    } catch (e) {
        alert(e.response.data.non_field_errors)
        console.log(e.response.data)
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
        alert(e.response.data)
    }
}

/* Logs the existing user out */
export async function logoutAsync_API(values) {
    try {
        const { token } = store.getState().auth
        store.dispatch(loading(true));
        const response = await axios({
            method: 'post',
            url: `${URL}/logout/`,
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        store.dispatch(removeToken());
        store.dispatch(loading(false));
    } catch (e) {
        alert(e.response.data)
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


