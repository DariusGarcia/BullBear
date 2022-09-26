const apiKey = '519b0d38ac484284abb5ed5338c2db0b'

// fetches Company name, sector, headquarters, dateFirstAdded, founded

export const FetchStockPeers = async (stock) => {
	const BASE_URL = `https://fmpcloud.io/api/v4/stock_peers?symbol=${stock}&apikey=`
	const api = `${BASE_URL}${apiKey}`

	return await fetch(api)
		.then((results) => results.json())
		.then((data) => data)
		.catch((err) => console.log(err))
}
