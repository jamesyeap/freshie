export const getRecipes = (recipes) => ({
    type: 'GET_RECIPES',
    payload: recipes
})

export const addRecipes = (recipe) => ({
    type: 'ADD_RECIPES',
    payload: recipe
})

export const getMealPlans = (mealPlans) => ({
    type: 'GET_MEAL_PLANS',
    payload: mealPlans
})

export const loading = bool => ({
    type: 'LOADING',
    isLoading: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});