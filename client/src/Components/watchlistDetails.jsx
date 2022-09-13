import { useState, useEffect } from 'react'
import { UseGetAPI } from '../Hooks/useGetAPI'
import { AiFillDelete } from 'react-icons/ai'
import { DeleteStock } from '../utils/deleteStock'

export const WatchlistDetails = (props) => {
	const { ticker } = props
	const [stockData, setStockData] = useState({})
	const [error, setError] = useState(null)

	useEffect(() => {
		UseGetAPI(ticker)
			.then((res) => setStockData(res))
			.catch((error) => console.log(error))
	}, [])

	return (
		<>
			{stockData[0] && stockData[0]['changesPercentage'] > 0 && (
				<ul className='h-full grid grid-cols-3 gap justify-between  items-center p-2 text-white'>
					{/* display stock ticker */}

					<li className='md:text-lg justify-start flex items-center text-green rounded-lg '>
						${ticker}
					</li>
					{/* display current price */}
					<li className=' md:text-base h-full justify-start items-center flex text-white'>
						${stockData[0]['price']?.toFixed(2)}
					</li>
					<button
						// onClick={() => DeleteStock(ticker)}
						className='text-white  flex justify-start md:px-4 '>
						<AiFillDelete
							className='hover:text-red hover:scale-110 transition ease-in-out delay-25'
							size={20}
						/>
					</button>
				</ul>
			)}
			{stockData[0] && stockData[0]['changesPercentage'] < 0 && (
				<ul className='h-full grid grid-cols-3 gap justify-between  items-center p-2 text-white '>
					{/* display stock ticker */}

					<li className=' md:text-lg justify-start flex items-center  text-red rounded-lg  '>
						${ticker}
					</li>
					{/* display current price */}
					<li className=' md:text-base h-full justify-start  text-white flex'>
						${stockData[0]['price']?.toFixed(2)}
					</li>
					<button
						// onClick={() => DeleteStock(ticker)}
						className='text-white  flex justify-starts md:px-4'>
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
