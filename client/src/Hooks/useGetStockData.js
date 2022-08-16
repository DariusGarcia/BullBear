const BASE_URL = 'https://polygon.io/'
const apiKey = process.env.REACT_APP_POLYGON_API_KEY

export const fetchStockData = (props) => {
	const stockDataUrl = `${BASE_URL}/v2/snapshot/locale/us/markets/stocks/tickers/${props.name}?apiKey=${apiKey}`

	return fetch(stockDataUrl)
		.then((res) => res.json())
		.then((data) => data.ticker)
		.catch((err) => console.error(err))
}
