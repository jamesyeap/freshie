import { ADD_RESTAURANT, GET_RESTAURANTS, ADD_MENU_ITEM, LOADING, ERROR, ACKNOWLEDGE } from "../actions/Restaurants.actions"
const initialState = {
    restaurants: [],
    loading: false,
    error: null
}

export const restaurantReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_RESTAURANT:
            return { ...state, restaurant: state.recipes.push(action.payload), loading: false }
        case GET_RESTAURANTS:
            return { ...state, restaurants: action.payload, loading: false }
        case ADD_MENU_ITEM:
            return { ...state, restaurant: action.payload, loading: false }
        case LOADING:
            return { ...state, loading: true }
        case ERROR:
            return { ...state, error: action.error, loading: false }
        case ACKNOWLEDGE:
            return { ...state, error: null }
        default:
            return state;
    }
}