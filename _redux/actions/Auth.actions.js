import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../store/store';

// ACTION-CREATORS
export const getToken = () => ({
    type: 'GET_TOKEN',
    token,
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
    isLoading: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});

