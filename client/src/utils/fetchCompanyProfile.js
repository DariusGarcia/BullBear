const BASE_URL = 'https://fmpcloud.io/api/v3/profile/'

// fetches stock metrics/stats
export const FetchCompanyProfile = async (stock) => {
	const api = `${BASE_URL}${stock}?apikey=${process.env.REACT_APP_API_KEY}`

	return await fetch(api)
		.then((results) => results.json())
		.then((data) => data)
		.catch((err) => console.log(err))
}
