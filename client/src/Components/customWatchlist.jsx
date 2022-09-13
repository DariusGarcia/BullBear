import { useState, useEffect } from 'react'
import { useWatchlistContext } from '../Hooks/useWatchlistContext'
import { WatchlistDetails } from './watchlistDetails'

export const CustomWatchlist = () => {
	const { watchlist, dispatch } = useWatchlistContext()
	// const [watchlist, setWatchlist] = useState(null)

	useEffect(() => {
		const fetchWatchlist = async () => {
			const response = await fetch('/api/watchlist')
			const json = await response.json()
			if (response.ok) {
				// setWatchlist(json.allStocks)
				dispatch({ type: 'SET_WATCHLIST', payload: json.allStocks })
			}
		}
		fetchWatchlist()
	}, [watchlist])

	return (
		<div className=' text-white w-full bg-grey rounded-lg '>
			<div className='w-full bg-grey2 h-12 items-center mb-4 rounded-lg z-50 sticky top-0 grid grid-cols-3 justify-between px-2'>
				<h2 className=''>Ticker</h2>
				<h2 className=''>Price</h2>
				<h2 className=''>Delete </h2>
			</div>
			<div className='bg-primary bg-opacity-20 overflow-y-auto h-96 rounded-lg'>
				{watchlist && watchlist.length > 1 ? (
					watchlist?.map((stock) => (
						<p
							key={stock._id}
							className='bg-primary my-4 shadow-2xl rounded-lg py-2'>
							{<WatchlistDetails ticker={stock.ticker}></WatchlistDetails>}
						</p>
					))
				) : (
					<p>Add stocks...</p>
				)}
			</div>
		</div>
	)
}
