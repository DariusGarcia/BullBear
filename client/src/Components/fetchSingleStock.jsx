import { useState, useEffect } from 'react'
import { UseGetAPI } from '../Hooks/useGetAPI'
import { StockMoreInfo } from './stockMoreInfo'
import { MdOutlineOpenInFull } from 'react-icons/md'

const FetchSingleStock = (props) => {
	const { name } = props
	const [toggle, setToggle] = useState(false)
	const [stockData, setStockData] = useState([{}])
	const [error, setError] = useState(null)

	useEffect(() => {
		UseGetAPI(name)
			.then((res) => setStockData(res))
			.catch((error) => console.log(error))
	}, [name])

	const handleAdd = async () => {
		const ticker = `${name}`
		console.log('handleAdd called')
		const response = await fetch('http://localhost:4000/api/watchlist', {
			method: 'POST',
			// mode: 'cors',
			body: JSON.stringify({ ticker: `${ticker}` }),
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

	let info

	const handleOnClick = () => {
		setToggle(!toggle)
	}

	if (toggle) {
		info = (
			<div className='w-full py-4'>
				<ul className='h-full grid grid-cols-5 content-center text-white px-2'>
					{/* display stock ticker */}
					<li className='text-xs hidden md:text-sm h-full items-center md:flex text-lightBlue'>
						{stockData[0]['name']?.split(' ')[0]?.split(',')?.join('')}
					</li>
					<li className='text-xs  md:text-base h-full items-center flex '>
						${name}
					</li>
					{/* display current price */}
					<li className='text-xs md:text-base h-full items-center flex  '>
						${stockData[0]['price']}
					</li>

					{/* display 24hr percentage change */}
					<li className='text-xs md:text-base h-full items-center flex  '>
						{stockData[0]['changesPercentage']?.toFixed(2)}%
					</li>

					<li className='text-xs justify-evenly  md:text-base h-full gap-4 items-center flex '>
						<button
							onClick={(event) => handleAdd(event)}
							className='h-8 w-16 rounded-lg bg-grey opacity-20 text-white'>
							Add
						</button>
						{error && <div className=''>{error}</div>}
						<MdOutlineOpenInFull
							className='cursor-pointer hover:scale-110 transition ease-in-out delay-25'
							onClick={handleOnClick}
							size={25}></MdOutlineOpenInFull>
					</li>
				</ul>
				<div className='w-full'>
					<StockMoreInfo
						openPrice={stockData[0]['open']}
						high={stockData[0]['dayHigh']}
						volume={stockData[0]['volume']?.toLocaleString()}
					/>
				</div>
			</div>
		)
	} else if (!toggle) {
		info = (
			<ul className='h-full grid p-2 py-4 grid-cols-5 content-center text-white'>
				{/* display stock ticker */}
				<li className='text-xs hidden md:text-sm h-full items-center md:flex text-lightBlue '>
					{stockData[0]['name']?.split(' ')[0]?.split(',')?.join('')}
				</li>
				<li className='text-xs md:text-base h-full items-center flex '>
					${name}
				</li>
				{/* display current price */}
				<li className='text-xs md:text-base h-full items-center flex'>
					${stockData[0]['price']}
				</li>
				{/* display 24hr percentage change */}
				<li className='text-xs md:text-base h-full items-center flex'>
					{stockData[0]['changesPercentage']?.toFixed(2)}%
				</li>
				<li className='justify-evenly text-xs md:text-base h-full gap-4 items-center flex'>
					<button
						onClick={(event) => handleAdd(event)}
						className='h-8 w-16 rounded-lg bg-primary border-2 opacity-50 hover:border-lightBlue hover:opacity-100 hover:scale-105 delay-25 ease-in-out transition text-white'>
						Add
					</button>
					<MdOutlineOpenInFull
						className='cursor-pointer hover:scale-110 transition ease-in-out delay-25'
						onClick={handleOnClick}
						size={25}></MdOutlineOpenInFull>
				</li>
			</ul>
		)
	}
	return (
		<nav className='w-full h-full border-lightBlue hover:rounded-xl '>
			{info}
		</nav>
	)
}

export default FetchSingleStock
