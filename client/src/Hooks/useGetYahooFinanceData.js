// const fetch = require('node-fetch')

export const fetchDataInfo = async (name) => {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '0d97302266msh6b2a73e1ff1a13dp1c8242jsn8cf1b0c3f629',
			'X-RapidAPI-Host': 'stock-market-data.p.rapidapi.com',
		},
	}

	return (
		fetch(
			`https://stock-market-data.p.rapidapi.com/stock/quote?ticker_symbol=${name}`,
			options
		)
			.then((response) => response.json())
			.then((data) => data)
			// .then((response) => console.log('stock data:', response))
			.catch((err) => console.error(err))
	)
}
