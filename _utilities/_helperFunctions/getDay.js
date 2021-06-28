export function getDay(dateObj) {
	const daysList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	const dayInt = dateObj.getDay() === 0 ? 6 : dateObj.getDay() - 1;
	const day = daysList[dayInt]

	return day;
}