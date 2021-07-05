// returns an object representing the current date in a format 
//		suitable for the backend
export default function getDateArgument() {
	const today = new Date();
	const dateArgument = {
			day: today.getDate(),
			month: today.getMonth() + 1,
			year: today.getFullYear()
	}

	return dateArgument;
}