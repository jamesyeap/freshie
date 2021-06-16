import { URL } from './index';

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


