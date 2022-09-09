const BASE_URL = 'https://fmpcloud.io/api/v3/quote/'
const apiKey = '519b0d38ac484284abb5ed5338c2db0b'

export const UseGetAPI = async (stock) => {
	const api = `https://fmpcloud.io/api/v3/quote/${stock}?apikey=519b0d38ac484284abb5ed5338c2db0b`

	return await fetch(api)
		.then((results) => results.json())
		.then((data) => data)
		.catch((err) => console.log(err))
}
