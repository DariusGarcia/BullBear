import { useState, useEffect, useMemo } from 'react'
import { UseGetAPI } from '../Hooks/useGetAPI'
import { AiFillDelete } from 'react-icons/ai'
import { DeleteStock } from '../utils/deleteStock'

export const WatchlistDetails = (props) => {
	const { ticker } = props
	const [stockData, setStockData] = useState({})
	const [error, setError] = useState(null)

	// useEffect(() => {
	// 	UseGetAPI(ticker)
	// 		.then((res) => setStockData(res))
	// 		.catch((error) => console.log(error))
	// }, [ticker])

	const MemoizedData = () =>
		useMemo(
			() =>
				UseGetAPI(ticker)
					.then((res) => setStockData(res))
					.catch((error) => console.log(error)),
			[]
		)

	MemoizedData()

	return (
		<>
			{stockData[0] && stockData[0]['changesPercentage'] > 0 && (
				<ul className='h-full grid grid-cols-3 gap justify-between   items-center p-2 text-white'>
					{/* display stock ticker */}

					<li className='justify-start flex items-center rounded-lg '>
						${ticker}
					</li>
					{/* display current price */}
					<li className='flex justify-center items-center text-green'>
						${stockData[0]['price']?.toFixed(2)}
					</li>
					<button
						// onClick={() => DeleteStock(ticker)}
						className='flex justify-start md:px-4 text-white'>
						<AiFillDelete
							className='hover:text-red hover:scale-110 transition ease-in-out delay-25'
							size={20}
						/>
					</button>
				</ul>
			)}
			{stockData[0] && stockData[0]['changesPercentage'] < 0 && (
				<ul className='h-full grid grid-cols-3 gap justify-between items-center p-2 text-white '>
					{/* display stock ticker */}

					<li className='flex justify-start items-center rounded-lg'>
						${ticker}
					</li>
					{/* display current price */}
					<li className='flex justify-start text-text-red'>
						${stockData[0]['price']?.toFixed(2)}
					</li>
					<button
						// onClick={() => DeleteStock(ticker)}
						className='flex justify-starts md:px-4 text-white'>
						<AiFillDelete
							className='hover:text-red hover:scale-110 transition ease-in-out delay-25'
							size={20}
						/>
					</button>
				</ul>
			)}
		</>
	)
}
