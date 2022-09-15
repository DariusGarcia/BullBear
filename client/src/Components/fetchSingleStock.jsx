import { useState, useEffect } from 'react'
import { useWatchlistContext } from '../Hooks/useWatchlistContext'
import { FetchCompanyProfile } from '../utils/fetchCompanyProfile'
import { UseGetAPI } from '../Hooks/useGetAPI'
import { StockMoreInfo } from './stockMoreInfo'
import { MdOutlineOpenInFull } from 'react-icons/md'

const FetchSingleStock = (props) => {
	const { name } = props
	const [toggle, setToggle] = useState(false)
	const [stockData, setStockData] = useState([{}])
	const { watchlist, dispatch } = useWatchlistContext()
	const [companyLogo, setCompanyLogo] = useState()
	const [error, setError] = useState(null)

	useEffect(() => {
		FetchCompanyProfile(name).then((image) => setCompanyLogo(image[0]['image']))
		UseGetAPI(name)
			.then((res) => setStockData(res))
			.catch((error) => console.log(error))
	}, [name])

	const handleAdd = async () => {
		const ticker = `${name}`
		console.log('handleAdd called')
		const response = await fetch('http://localhost:4000/api/watchlist', {
			method: 'POST',
			body: JSON.stringify({ ticker: `${ticker}` }),
			headers: { 'Content-Type': 'application/json' },
		})

		const json = await response.json()

		if (!response.ok) {
			setError(json.error)
		}

		if (response.ok) {
			dispatch({ type: 'ADD_STOCK', payload: json })
			setError(null)
			console.log('New stock added to watchlist')
		}
	}

	let info

	const handleOnClick = () => {
		setToggle(!toggle)
	}

	if (!watchlist && !companyLogo) {
		info = (
			<span className='flex w-full h-full justify-center items-center hover:border-2 border-lightBlue hover:rounded-xl '>
				<p id='class-nf' className='w-full pl-2 text-red font-bold'>
					Invalid stock ticker...
				</p>
			</span>
		)
	} else {
		info = (
			<span className='flex w-full h-full justify-center items-center hover:border-2 border-lightBlue hover:rounded-xl '>
				<p id='class-nf' className='w-full pl-2 py-4 text-red'>
					Invalid stock...
				</p>
			</span>
		)
	}

	if (toggle && companyLogo) {
		info = (
			<div className='flex flex-col'>
				<div className=' w-full py-4'>
					<ul className='h-full grid grid-cols-5 content-center text-white px-2'>
						{/* display stock ticker */}
						<li className='flex h-full items-center md:gap-1 text-xs md:text-sm text-lightBlue'>
							<div className='w-1/3'>
								<img
									className='w-max h-8 md:h-12 rounded-lg'
									src={companyLogo}
									alt={companyLogo}></img>
							</div>
							{stockData[0]['name']?.split(' ')[0]?.split(',')?.join('')}
						</li>
						<li className='text-xs  md:text-base h-full items-center flex '>
							${name}
						</li>

						{/* display current price */}
						{stockData[0] && stockData[0]['changesPercentage'] > 0 && (
							<li className='text-xs md:text-base text-green h-full items-center flex  '>
								${stockData[0]['price']?.toFixed(2)}
							</li>
						)}
						{stockData[0] && stockData[0]['changesPercentage'] < 0 && (
							<li className='text-xs md:text-base text-red h-full items-center flex  '>
								${stockData[0]['price']?.toFixed(2)}
							</li>
						)}

						{/* display 24hr percentage change */}
						<li className='text-xs md:text-base h-full items-center flex  '>
							{stockData[0]['changesPercentage']?.toFixed(2)}%
						</li>

						{error && <li className=''>{error}</li>}
						<span className='flex flex-row gap-12 items-center justify-around'>
							<span>
								<button
									onClick={(event) => handleAdd(event)}
									className='h-8 w-16 rounded-lg bg-primary border-2 opacity-50 hover:border-lightBlue hover:opacity-100 hover:scale-105 delay-25 ease-in transition text-white'>
									Add
								</button>
							</span>
							<span>
								<MdOutlineOpenInFull
									className='cursor-pointer hover:scale-110 transition text-white ease-in-out delay-25'
									onClick={handleOnClick}
									size={25}></MdOutlineOpenInFull>
							</span>
						</span>
					</ul>
				</div>
				<div className='w-full mb-4'>
					<StockMoreInfo
						ticker={name}
						openPrice={stockData[0]['open']}
						high={stockData[0]['dayHigh']}
						volume={stockData[0]['volume']?.toLocaleString()}
					/>
				</div>
			</div>
		)
	} else if (!toggle && companyLogo) {
		info = (
			<ul className='h-full grid px-2 py-4 grid-cols-5 content-center text-white'>
				{/* display stock ticker */}
				<li className='flex h-full items-center md:gap-1 text-xs md:text-sm text-lightBlue'>
					<div className='w-1/3'>
						<img
							className='w-max h-8 md:h-12 rounded-lg '
							src={companyLogo}
							alt={companyLogo}></img>
					</div>
					{stockData[0]['name']?.split(' ')[0]?.split(',')?.join('')}
				</li>
				<li className='text-xs md:text-base h-full items-center flex '>
					${name}
				</li>
				{/* display current price */}
				{stockData[0] && stockData[0]['changesPercentage'] > 0 && (
					<li className='text-xs md:text-base text-green h-full items-center flex  '>
						${stockData[0]['price']?.toFixed(2)}
					</li>
				)}
				{stockData[0] && stockData[0]['changesPercentage'] < 0 && (
					<li className='text-xs md:text-base text-red h-full items-center flex  '>
						${stockData[0]['price']?.toFixed(2)}
					</li>
				)}
				{/* display 24hr percentage change */}
				<li className='text-xs md:text-base h-full items-center flex'>
					{stockData[0]['changesPercentage']?.toFixed(2)}%
				</li>
				<li className='text-xs md:text-base h-full gap-12 items-center justify-around flex'>
					<span>
						<button
							onClick={(event) => handleAdd(event)}
							className='h-8 w-16 rounded-lg bg-primary border-2 opacity-50 hover:border-lightBlue hover:opacity-100 hover:scale-105 delay-25 ease-out transition text-white'>
							Add
						</button>
					</span>
					<span>
						<MdOutlineOpenInFull
							className='cursor-pointer hover:scale-110 transition text-white ease-in-out delay-25'
							onClick={handleOnClick}
							size={25}></MdOutlineOpenInFull>
					</span>
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
