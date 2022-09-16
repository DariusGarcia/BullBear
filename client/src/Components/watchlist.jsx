import { useMemo, useEffect } from 'react'
import { useWatchlistContext } from '../Hooks/useWatchlistContext'
import { WatchlistDetails } from './watchlistDetails'
import { useAuthContext } from '../Hooks/useAuthContext'

export const Watchlist = () => {
	const { watchlist, dispatch } = useWatchlistContext()
	const { user } = useAuthContext()

	const data = useMemo(() => watchlist, [])

	useEffect(() => {
		const fetchWatchlist = async () => {
			const response = await fetch('/api/watchlist', {
				headers: {
					Authorization: `Bearer ${user.token}`,
					'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				},
			})
			const json = await response.json()
			if (response.ok) {
				// setWatchlist(json.allStocks)
				dispatch({ type: 'SET_WATCHLIST', payload: json.allStocks })
			}
		}
		if (user) {
			fetchWatchlist()
		}
	}, [data, dispatch, user])

	return (
		<div className=' text-white w-full bg-grey rounded-lg '>
			<div className='sticky top-0 grid grid-cols-3 justify-between md:px-2 w-full mt-2 md:mt-7 h-12 items-center mb-4 bg-grey2 rounded-lg z-50 '>
				<h2 className='flex justify-center opacity-70'>Ticker</h2>
				<h2 className='flex justify-center opacity-70'>Price</h2>
				<h2 className='flex justify-center opacity-70'>Delete </h2>
			</div>
			<ul className='bg-primary bg-opacity-20 overflow-y-auto h-96 rounded-lg'>
				{watchlist && watchlist.length >= 1 ? (
					watchlist?.map((stock) => (
						<li
							key={stock._id}
							className='bg-primary mb-4 w-full shadow-lg rounded-lg '>
							{
								<WatchlistDetails
									watchlistInfo={stock._id}
									ticker={stock.ticker}></WatchlistDetails>
							}
						</li>
					))
				) : (
					<p className='p-4'>Add stocks...</p>
				)}
			</ul>
		</div>
	)
}
