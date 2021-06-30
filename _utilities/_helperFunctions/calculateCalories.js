/* Calculates the target calories for a user */

/* Inputs
	- Weight (in kg)
	- Height (in cm)
	- Age (in years)
	- Gender (0 for male, 1 for female)
	- Activity Level (0, 1, 2, 3, 4)
   Output
	- Total caloric expenditure
		-> user will eat MORE or LESS calories than this, depending on goal
*/
export default function calculateCalories(weight, height, age, gender, activityLevel) {
	// FIRST STEP: Calculate BMR (different for males and females)
	const maleBMR = (10 * Number(weight)) + (6.25 * Number(height)) - (5 * Number(age)) + 5;
	const femaleBMR = (10 * Number(weight)) + (6.25 * Number(height)) - (5 * Number(age)) - 161;

	// SECOND STEP: Multiply by specified activity level
		/* TO DETERMINE WHICH MULTIPLIER TO USE, 
			- Sedentary (little or no exercise) : Calorie-Calculation = BMR x 1.2
			- Lightly active (light exercise/sports 1-3 days/week) : Calorie-Calculation = BMR x 1.375
			- Moderately active (moderate exercise/sports 3-5 days/week) : Calorie-Calculation = BMR x 1.55
			- Very active (hard exercise/sports 6-7 days a week) : Calorie-Calculation = BMR x 1.725
			- If you are extra active (very hard exercise/sports & a physical job) : Calorie-Calculation = BMR x 1.9

		** Source: https://www.omnicalculator.com/health/bmr-harris-benedict-equation ** 
		*/

	if (gender === 0) {
		switch(activityLevel) {
			case 0:
				return (maleBMR * 1.2); 
			case 1:
				return (maleBMR * 1.375);
			case 2:
				return (maleBMR * 1.55);
			case 3: 
				return (maleBMR * 1.725);
			case 4: 
				return (maleBMR * 1.9);
			default:
				return (maleBMR * 1.2);
		}
	} else {
		switch(activityLevel) {
			case 0:
				return (femaleBMR * 1.2); 
			case 1:
				return (femaleBMR * 1.375);
			case 2:
				return (femaleBMR * 1.55);
			case 3: 
				return (femaleBMR * 1.725);
			case 4: 
				return (femaleBMR * 1.9);
			default:
				return (femaleBMR * 1.2);
		}
	}
}