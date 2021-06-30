/* Determines if the meal was consumed at Breakfast, Lunch, or Dinner */

export function determineMealType() {
	const currTime = new Date().getHours();

	if (currTime >= 6 && currTime < 12) {
		return "Breakfast"
	} else if (currTime >= 12 && currTime < 18) {
		return "Lunch"
	} else if (currTime >= 18 && currTime < 21) {
		return "Dinner"
	} else {
		return "Supper"
	}
}