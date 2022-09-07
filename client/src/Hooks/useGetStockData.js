const BASE_URL = 'https://api.polygon.io'
const QUERY_URL = '/v2/snapshot/locale/us/markets/stocks/tickers/'
const ENVapiKey = process.env.REACT_APP_POLYGON_API_KEY
const apiKey = 'T8nMjxuiilD9ZklUs0OODmmpcIXN467H'

export const fetchStockData = async (stock) => {
	const stockDataUrl = `${BASE_URL}${QUERY_URL}${stock}?apiKey=${apiKey}`

	return await fetch(stockDataUrl)
		.then((res) => res.json())

		.catch((err) => console.error(err))
}
