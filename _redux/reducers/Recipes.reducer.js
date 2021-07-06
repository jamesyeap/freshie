import { ADD_RECIPE, GET_RECIPES, GET_MEAL_PLANS, LOADING, ERROR, ACKNOWLEDGE } from "../actions/Recipes.actions"
const initialState = {
    mealPlans: [],
    recipes: [],
    loading: false,
    error: null
}

export const recipesReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_RECIPE:
            return { ...state, recipes: state.recipes.push(action.payload), loading: false }
        case GET_RECIPES:
            return { ...state, recipes: action.payload, loading: false }
        case GET_MEAL_PLANS:
            return { ...state, mealPlans: action.payload, loading: false }
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