export function getDay(dateObj) {
	const daysList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	const dayInt = dateObj.getDay();
	const day = daysList[dayInt]

	return day;
}