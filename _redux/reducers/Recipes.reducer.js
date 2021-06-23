const initialState = {
    mealPlans: [],
    recipes: [],
    loading: false,
    error: null
}

export const recipesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_RECIPE':
            return { ...state, recipes: state.recipes.push(action.payload) }
        case 'GET_RECIPES':
            return { ...state, recipes: action.payload }
        case 'GET_MEAL_PLANS':
            return { ...state, mealPlans: action.payload }
        case 'LOADING':
            return { ...state, loading: action.payload }
        case 'ERROR' :
            return { ...state, error: action.payload }
        default:
            return state;
    }
}