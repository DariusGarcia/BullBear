const BASE_URL = 'https://api.polygon.io'
const apiKey = process.env.REACT_APP_POLYGON_API_KEY
const key = 'T8nMjxuiilD9ZklUs0OODmmpcIXN467H'

// module used to fetch stock data excluding current price

export const fetchStockInfo = async (props) => {
	const { name } = props

	const stockInfoUrl = `${BASE_URL}/v3/reference/tickers/${name}?apiKey=${key}`

	return await fetch(stockInfoUrl)
		.then((res) => res.json())
		.then((json) => json)
		.catch((err) => console.error(err))
}
