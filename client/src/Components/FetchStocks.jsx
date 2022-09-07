import React, { useState, useEffect } from 'react'

import { fetchStockInfo } from '../Hooks/useGetStockInfo'
import { fetchStockData } from '../Hooks/useGetStockData'
import { fetchPrice } from '../Hooks/useGetStockPrice'
import { fetchDataInfo } from '../Hooks/useGetYahooFinanceData'

// have to use two different API endpoint because one of the API doesn't include current price of the stock

function FetchStocks(props) {
	const { name } = props
	const [stockInfo, setStockInfo] = useState([])
	const [stockData, setStockData] = useState([])
	const [price, setPrice] = useState([])
	const [logo, setLogo] = useState([])
	const [ticker, setTicker] = useState([])

	useEffect(() => {
		fetchDataInfo(name).then((data) => setStockData(data.quote))
		// fetchPrice(name).then((data) => console.log(data))
		// fetchStockData(name).then((data) => console.log(data))
	}, [name])

	let info

	if (stockInfo) {
		info = (
			<>
				<nav className='h-full w-full hover:border-2 border-lightBlue hover:rounded-xl '>
					<ul className='h-full flex items-center text-white px-2'>
						{/* display stock ticker */}
						<li className='text-xs  md:text-lg w-1/6 text-lightBlue'>
							${name}
						</li>
						<li className='text-xs  md:text-sm w-1/6 text-lightBlue'>
							{stockData['Company Name']}
						</li>
						{/* display current price */}
						<li className='text-xs md:text-base w-28 md:w-1/6'>
							${stockData['Current Price']}
						</li>
						{/* display ticker opening price */}
						<li className='text-xs md:text-base w-28 md:w-1/6'>
							${stockData["Today's Open"]}
						</li>
						{/* display ticker prev day price */}
						<li className='text-xs md:text-base w-28 md:w-1/6'>
							$ {stockData["Today's High"]}
						</li>
						{/* display 24hr percentage change */}
						<li className='text-xs md:text-base w-24 md:w-1/6'>
							{stockData["Today's Change"].toFixed(2)}%
						</li>
						{/* display stock daily volume */}
						<li className='text-xs md:text-base w-28 md:w-1/6'>
							{stockData["Today's Volume"].toLocaleString()}
						</li>
						<li className='text-xs md:text-base w-28 md:w-1/6'>
							{/* {stockInfo.ticker} */}
						</li>
					</ul>
				</nav>
			</>
		)
	} else if (stockInfo == null) {
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
