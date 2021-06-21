export const URL = "http://freshie-api.herokuapp.com/"
import axios from 'axios';
import { store } from '../../_redux/store/store';
import { getToken, saveToken, removeToken, loading, error } from '../../_redux/actions/Auth.actions';
import { stripPrefix } from 'xml2js/lib/processors';

// Log user in
export async function loginAsync() {
    try {
        store.dispatch(loading(true));
        const response = await axios({
            method: 'post',
            url: `${URL}/login/`,
            data: values
        })
        store.dispatch(saveToken(response.key));
        store.dispatch(loading(false));
    } catch (e) {
        console.log(e)
        alert(e);
        store.dispatch(loading(false));
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


