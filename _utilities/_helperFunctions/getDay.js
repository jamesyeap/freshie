export function getDay(dateObj) {
	const daysList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	const dayInt = dateObj.getDay() - 1;
	const day = daysList[dayInt]

	return day;
}