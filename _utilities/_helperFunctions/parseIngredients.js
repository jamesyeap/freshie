/* Converts a serialized string of ingredients into 
	an array of ingredient objects

    ⊃ separates ingredients
	¬ separates title and weight 
*/

export function parseIngredients (serializedIngredients) {
    const split = serializedIngredients.split('')

    let result = []
    let foodItem = {}

    for (let i = 0; i < split.length; i++) {
        if (split[i] === "⊃") {
            result.push(foodItem)
            foodItem = {}
        } else if (split[i] === "¬") {
            foodItem['weight'] = []
        } else {
        		if (foodItem['weight']) {
            	foodItem['weight'].push(split[i])
            } else {
            	foodItem['title']
                ? foodItem['title'].push(split[i])
                : foodItem['title'] = [split[i]]
            }
        }
    }
    
    let cleanResult = []
    result = result.map((item, index) => {
    	item.title = item.title.join("")
        item.weight = item.weight.join("")
      
        cleanResult.push({...item, id: index})
    })
    
    return cleanResult
}

/* EXAMPLE */
	// const mockIngredients = "Bread¬200g⊃Chicken¬500g⊃Fish100g"
	// const parsedIngredients = parseIngredients(mockIngredients)