const apiKey = '519b0d38ac484284abb5ed5338c2db0b'
const base_url = 'https://fmpcloud.io/api/v3/'

export const UseFetchBroadMarketData = async (describe) => {
	const api = `${base_url}${describe}?apikey=${apiKey}`

	return await fetch(api)
		.then((results) => results.json())
		// .then((data) => console.log(data))
		.then((data) => data)
		.catch((err) => console.log(err))
}
