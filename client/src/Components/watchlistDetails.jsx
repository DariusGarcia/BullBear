import { useState, useEffect } from 'react'
import { UseGetAPI } from '../Hooks/useGetAPI'
import { AiFillDelete } from 'react-icons/ai'

export const WatchlistDetails = (props) => {
	const { ticker } = props
	const [stockData, setStockData] = useState({})
	const [error, setError] = useState(null)

	useEffect(() => {
		UseGetAPI(ticker)
			.then((res) => setStockData(res))
			.catch((error) => console.log(error))
	}, [])

	const deleteStock = async () => {
		const stock = `${ticker}`
		console.log('handleAdd called')
		const response = await fetch('http://localhost:4000/api/watchlist', {
			method: 'POST',
			// mode: 'cors',
			body: JSON.stringify({ ticker: `${stock}` }),
			headers: { 'Content-Type': 'application/json' },
		})

		const json = await response.json()

		if (!response.ok) {
			setError(json.error)
		}

		if (response.ok) {
			setError(null)
			console.log('New stock added to watchlist')
		}
	}

	// let data
	// if (stockData && stockData[0]['changesPercentage'] > 0) {
	// 	data =
	// 		'h-full flex flex-row gap justify-between  items-center p-2 text-green'
	// } else {
	// 	data = 'h-full flex flex-row gap justify-between  items-center p-2 text-red'
	// }
	return (
		<>
			{stockData[0] && stockData[0]['changesPercentage'] > 0 && (
				<ul className='h-full grid grid-cols-3 gap justify-between  items-center p-2 text-white'>
					{/* display stock ticker */}

					<li className='text-xs md:text-lg justify-start flex items-center text-green rounded-lg '>
						${ticker}
					</li>
					{/* display current price */}
					<li className='text-xs md:text-base h-full justify-start items-center flex text-green'>
						${stockData[0]['price']}
					</li>
					<button
						onClick={() => deleteStock()}
						className='text-white text-sm flex justify-end pr-8 '>
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

					<li className='text-xs md:text-lg justify-start flex items-center  text-red rounded-lg  '>
						${ticker}
					</li>
					{/* display current price */}
					<li className='text-xs md:text-base h-full justify-start  text-red flex'>
						${stockData[0]['price']}
					</li>
					<button
						onClick={() => deleteStock()}
						className='text-white text-sm flex justify-end pr-8'>
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
