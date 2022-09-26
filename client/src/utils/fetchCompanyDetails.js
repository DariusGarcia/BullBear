const BASE_URL = 'https://fmpcloud.io/api/v3/sp500_constituent?apikey='

// fetches Company name, sector, headquarters, dateFirstAdded, founded

export const FetchCompanyDetails = async (stock) => {
	const api = `${BASE_URL}${process.env.REACT_APP_API_KEY}`

	return await fetch(api)
		.then((results) => results.json())
		.then((data) => data)
		.catch((err) => console.log(err))
}
