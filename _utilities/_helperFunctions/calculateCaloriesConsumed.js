 // Calculate the amount of total calories consumed 
//  	from an array of consumed meals 

export default function countCalories(consumedMealsArray) { 
	if (consumedMealsArray.length === 0) {
			return 0;
	} else {
			let temp = 0; 

			for (let i = 0; i < consumedMealsArray.length; i++) {
					temp += consumedMealsArray[i].calories;
			}

			return temp;
	}
}