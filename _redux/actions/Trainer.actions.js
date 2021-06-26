export const getClients = listOfClients => {
	return {
		type: 'FETCH_CLIENTS',
		payload: listOfClients
	};
}

export const getReferralCode = referralCode => {
	return {
		type: 'FETCH_REFERRAL_CODE',
		payload: referralCode
	}
}

export const loading = boolean => {
	return {
		type: 'LOADING',
		payload: boolean
	}
}

export const error = error => {
	return {
		type: 'ERROR',
		payload: error
	}
}

