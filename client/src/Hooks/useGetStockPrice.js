const BASE_URL = ' https://alpha-vantage.p.rapidapi.com/'

// module used to fetch stock current price
export const fetchPrice = async (props) => {
	const { name } = props

	const stockPriceUrl = `${BASE_URL}query?function=GLOBAL_QUOTE&symbol=${name}&datatype=json`
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '0d97302266msh6b2a73e1ff1a13dp1c8242jsn8cf1b0c3f629',
			'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
		},
	}
	return await fetch(stockPriceUrl, options)
		.then((res) => res.json())
		.then((json) => json['Global Quote'])
		.then((data) => data)
		.catch((err) => console.error(err))
}
