const apiKey = '519b0d38ac484284abb5ed5338c2db0b'

// fetches Company ratings based on different sources

export const FetchStockRatings = async (stock) => {
	const BASE_URL = `https://fmpcloud.io/api/v3/rating/${stock}?apikey=`
	const api = `${BASE_URL}${apiKey}`

	return await fetch(api)
		.then((results) => results.json())
		.then((data) => data)
		.catch((err) => console.log(err))
}
