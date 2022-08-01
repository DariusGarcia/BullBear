import React, { useState, useEffect } from 'react'

const apiKey = process.env.REACT_APP_POLYGON_API_KEY

function FetchStocks(props) {
	const [stockInfo, setStockInfo] = useState([])
	const [stockData, setStockData] = useState([])
	const [price, setPrice] = useState([])
	const [logo, setLogo] = useState([])
	const [ticker, setTicker] = useState([])

	const stockInfoUrl = `https://api.polygon.io/v3/reference/tickers/${props.name}?apiKey=${apiKey}`
	const stockDataUrl = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${props.name}?apiKey=${apiKey}`

	const fetchStockInfo = () => {
		fetch(stockInfoUrl)
			.then((res) => res.json())
			.then((data) => {
				setStockInfo(data.results)
			})
			.catch((err) => console.error(err))
	}

	const fetchStockData = () => {
		fetch(stockDataUrl)
			.then((res) => res.json())
			.then((data) => {
				setStockData(data.ticker)
				// console.log(stockData);
			})
			.catch((err) => console.error(err))
	}

	const fetchPrice = () => {
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': '0d97302266msh6b2a73e1ff1a13dp1c8242jsn8cf1b0c3f629',
				'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
			},
		}

		fetch(
			`https://alpha-vantage.p.rapidapi.com/query?function=GLOBAL_QUOTE&symbol=${props.name}&datatype=json`,
			options
		)
			.then((response) => response.json())
			.then((response) => setPrice(response['Global Quote']['05. price']))
			.catch((err) => console.error(err))
	}

	useEffect(() => {
		fetchStockInfo()
	}, [props.name])
	useEffect(() => {
		fetchStockData()
	}, [props.name])
	useEffect(() => {
		fetchPrice()
	}, [props.name])

	let info

	if (ticker) {
		info = (
			<>
				<nav className='h-full w-full hover:border-2 border-lightBlue hover:rounded-xl '>
					<ul className='h-full flex items-center px-2'>
						<li className='text-xs  md:text-lg w-1/6 text-lightBlue'>
							${stockInfo.ticker}
						</li>
						<li className='text-xs md:text-base w-28 md:w-1/6'>${price}</li>
						<li className='text-xs md:text-base w-28 md:w-1/6'>
							{/* ${stockData.day.o} */}
						</li>
						<li className='text-xs md:text-base w-28 md:w-1/6'>
							{/* ${stockData.prevDay.c} */}
						</li>
						<li className='text-xs md:text-base w-24 md:w-1/6'>
							{stockData.todaysChangePerc}%
						</li>
						<li className='text-xs md:text-base w-28 md:w-1/6'>
							{/* {stockData.day.v} */}
						</li>
						<li className='text-xs md:text-base w-28 md:w-1/6'>
							{stockInfo.ticker}
						</li>
					</ul>
				</nav>
			</>
		)
	} else if (ticker == null) {
		info = (
			<span className='flex w-full h-full justify-center items-center hover:border-2 border-lightBlue hover:rounded-xl '>
				<p id='class-nf' className='w-full pl-2 text-red font-bold'>
					Invalid stock ticker...
				</p>
			</span>
		)
	} else {
		info = (
			<p className='hover:border-2 border-lightBlue hover:rounded-xl'>
				Loading...
			</p>
		)
	}

	return (
		<div className='overflow-x-scroll md:overflow-x-hidden flex h-12 md:w-full my-4 text-sm md:text-base bg-primary mx-3 md:mx-0 rounded-xl'>
			{info}
		</div>
	)
}

export default FetchStocks
