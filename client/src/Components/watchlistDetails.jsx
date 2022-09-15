import { useState, useEffect, useMemo } from 'react'
import { UseGetAPI } from '../Hooks/useGetAPI'
import { AiFillDelete } from 'react-icons/ai'
// import { DeleteStock } from '../utils/deleteStock'
import { FetchCompanyProfile } from '../utils/fetchCompanyProfile'
import { useWatchlistContext } from '../Hooks/useWatchlistContext'

export const WatchlistDetails = ({ ticker, watchlistInfo }) => {
	const [stockData, setStockData] = useState({})
	const [companyLogo, setCompanyLogo] = useState()
	const [error, setError] = useState(null)
	const { dispatch } = useWatchlistContext()

	const DeleteStock = async () => {
		const response = await fetch(
			'http://localhost:4000/api/watchlist/' + watchlistInfo,
			{
				method: 'DELETE',
			}
		)

		const json = await response.json()

		if (response.ok) {
			dispatch({ type: 'DELETE_STOCK', payload: json })
			console.log('Stock removed from watchlist')
		}
	}

	const MemoizedData = () =>
		useMemo(() => {
			FetchCompanyProfile(ticker).then((image) =>
				setCompanyLogo(image[0]['image'])
			)
			UseGetAPI(ticker)
				.then((res) => setStockData(res))
				.catch((error) => console.log(error))
		}, [])

	MemoizedData()

	return (
		<>
			{stockData[0] && stockData[0]['changesPercentage'] > 0 && (
				<ul className='h-full grid grid-cols-3 justify-between w-full items-center p-2 text-white'>
					{/* display stock ticker */}
					<li className='justify-start flex gap-2 items-center w-max  rounded-lg '>
						<div className=''>
							<img
								className='w-max h-8 md:h- rounded-lg'
								src={companyLogo}
								alt={companyLogo}></img>
						</div>
						${ticker}
					</li>
					{/* display current price */}
					<li className='flex justify-center items-center w-full text-green'>
						${stockData[0]['price']?.toFixed(2)}
					</li>
					<button
						onClick={DeleteStock}
						className='flex justify-start w-full md:px-4 text-white'>
						<AiFillDelete
							className='hover:text-red hover:scale-110 transition ease-in-out delay-25'
							size={20}
						/>
					</button>
				</ul>
			)}
			{stockData[0] && stockData[0]['changesPercentage'] < 0 && (
				<ul className='h-full grid grid-cols-3 justify-between w-full items-center p-2 text-white '>
					{/* display stock ticker */}

					<li className='flex justify-start items-center rounded-lg'>
						${ticker}
					</li>
					{/* display current price */}
					<li className='flex justify-start text-red'>
						${stockData[0]['price']?.toFixed(2)}
					</li>
					<button
						onClick={DeleteStock}
						className='flex justify-starts md:px-4 w-max text-white'>
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
