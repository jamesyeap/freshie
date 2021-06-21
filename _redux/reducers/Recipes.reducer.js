const initialState = {
    recipes: []
}

export const recipeReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_RECIPE':
            return { ...state, recipes: state.recipes.push(action.payload)}
        case 'GET_RECIPES':
            return { ...state, recipes: action.payload}
        default:
            return state;
    }
}