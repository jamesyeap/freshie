/* Converts an array of ingredient objects into a serialized string
		for storage in the backend	
		
	⊃ separates ingredients
	¬ separates title and weight 
*/
export function serializeIngredients (ingredients) {
	let result = "";
	let remIngredients = ingredients;
	
	while (ingredients.length > 0) {
	  let ingredient = remIngredients.shift()
	  result += ingredient.title + "¬" + ingredient.weight + "⊃"
	}
	
	return result
  }

  /* EXAMPLE */

//   const ingredients = [{
// 	title: "Bread",
// 	weight: "200g"
//   }, {
// 	title: "Chicken",
// 	weight: "500g"
//   }]

//   console.log(serializeIngredients(parsedIngredients))