const BASE_URL = 'https://polygon.io/'
const apiKey = process.env.REACT_APP_POLYGON_API_KEY

export const fetchStockInfo = (props) => {
	const { name } = props

	const stockInfoUrl = `${BASE_URL}/v3/reference/tickers/${name}?apiKey=${apiKey}`

	return fetch(stockInfoUrl)
		.then((res) => res.json())
		.then((data) => data.results)
		.then((data) => console.log(data))
		.catch((err) => console.error(err))
}
