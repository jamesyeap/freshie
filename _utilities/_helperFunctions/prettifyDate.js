export function prettifyDate(dateObj) {
	const year = dateObj.getFullYear();
	const monthInt = dateObj.getMonth();
	const day = dateObj.getDate();

	switch(monthInt) {
		case 0: {
			return `${day} January ${year}`
		}

		case 1: {
			return `${day} February ${year}`
		}

		case 2: {
			return `${day} March ${year}`
		}

		case 3: {
			return `${day} April ${year}`
		}

		case 4: {
			return `${day} May ${year}`
		}

		case 5: {
			return `${day} June ${year}`
		}

		case 6: {
			return `${day} July ${year}`
		}

		case 7: {
			return `${day} August ${year}`
		}

		case 8: {
			return `${day} September ${year}`
		}

		case 9: {
			return `${day} October ${year}`
		}

		case 10: {
			return `${day} November ${year}`
		}

		case 11: {
			return `${day} December ${year}`
		}
	}
}