const BASE_URL = 'https://fmpcloud.io/api/v3/quote/'

export const FetchBatchStocks = async () => {
	// const api = () =>
	// 	BASE_URL +
	// 	`${stock.map((stock) => stock.concat(','))} + ?apikey=` +
	// 	process.env.REACT_APP_API_KEY
	const api = () =>
		'https://fmpcloud.io/api/v3/quote/AAPL,MSFT,FB?apikey=' +
		process.env.REACT_APP_API_KEY

	return await fetch(api)
		.then((results) => results.json())
		.then((data) => console.log(data))
		.then((data) => data)
		.catch((err) => console.log(err))
}
