import { useState, useEffect, useMemo } from 'react'
import { UseGetAPI } from '../Hooks/useGetAPI'
import { AiFillDelete } from 'react-icons/ai'
import { FetchCompanyProfile } from '../utils/fetchCompanyProfile'
import { useWatchlistContext } from '../Hooks/useWatchlistContext'
import { useAuthContext } from '../Hooks/useAuthContext'

export const WatchlistDetails = ({ ticker, watchlistInfo }) => {
	const [stockData, setStockData] = useState({})
	const [companyLogo, setCompanyLogo] = useState()
	const { dispatch } = useWatchlistContext()
	const { user } = useAuthContext()

	const DeleteStock = async () => {
		if (!user) {
			return
		}

		const response = await fetch(
			'http://localhost:4000/api/watchlist/' + watchlistInfo,
			{
				headers: {
					Authorization: `Bearer ${user.token}`,
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				},
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
			{/* display when change is positive*/}
			{stockData[0] && stockData[0]['changesPercentage'] > 0 && (
				<div className='h-full grid grid-cols-3 justify-between w-full items-center p-2 py-4 text-white'>
					{/* display stock ticker */}
					<p className='justify-start flex gap-2 items-center w-max rounded-lg '>
						<div className=''>
							<img
								className='w-max h-8 rounded-lg'
								src={companyLogo}
								alt={companyLogo}></img>
						</div>
						<div className='ml-1 text-sm'>${ticker}</div>
					</p>
					{/* display current price */}
					<p className='flex justify-center items-center w-full text-green'>
						${stockData[0]['price']?.toFixed(2)}
					</p>
					<button
						onClick={DeleteStock}
						className='flex justify-center text-white opacity-50 hover:opacity-100'>
						<AiFillDelete
							className='hover:text-red hover:scale-110 transition ease-in-out delay-25'
							size={20}
						/>
					</button>
				</div>
			)}

			{/* display when change is negative*/}
			{stockData[0] && stockData[0]['changesPercentage'] < 0 && (
				<div className=''>
					<div className='h-full grid grid-cols-3 w-full justify-between items-center p-2 py-4 text-white '>
						{/* display logo and ticker */}
						<div className='flex justify-start items-center rounded-lg'>
							<img
								className='w-max h-8 rounded-lg'
								src={companyLogo}
								alt={companyLogo}></img>
							<div className='ml-1 text-sm'>${ticker}</div>
						</div>
						{/* display current price */}
						<p className='flex justify-center text-red'>
							${stockData[0]['price']?.toFixed(2)}
						</p>
						<button
							onClick={DeleteStock}
							className='flex justify-center text-white opacity-50 hover:opacity-100'>
							<AiFillDelete
								className='hover:text-red flex justify-center hover:scale-110 transition ease-in-out delay-25'
								size={20}
							/>
						</button>
					</div>
				</div>
			)}
		</>
	)
}
