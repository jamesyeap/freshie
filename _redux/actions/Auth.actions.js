
// ACTION-CREATORS
export const getToken = () => ({
    type: 'GET_TOKEN',
});

export const saveUser = response => ({
    type: 'SAVE_USER',
    payload: response
});

export const removeToken = () => ({
    type: 'REMOVE_TOKEN',
});

export const loading = bool => ({
    type: 'LOADING',
    payload: bool,
});

export const error = error => ({
    type: 'ERROR',
    payload: error,
});


