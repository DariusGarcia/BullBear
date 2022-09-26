// fetches stock ratings based on different sources

export const FetchStockRatings = async (stock) => {
	const BASE_URL = `https://fmpcloud.io/api/v3/rating/${stock}?apikey=`
	const api = `${BASE_URL}${process.env.REACT_APP_API_KEY}`

	return await fetch(api)
		.then((results) => results.json())
		.then((data) => data)
		.catch((err) => console.log(err))
}
