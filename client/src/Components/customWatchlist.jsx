import { useState, useEffect } from 'react'
import { WatchlistDetails } from './watchlistDetails'

export const CustomWatchlist = () => {
	const [watchlist, setWatchlist] = useState(null)

	useEffect(() => {
		const fetchWatchlist = async () => {
			const response = await fetch('/api/watchlist')
			const json = await response.json()
			if (response.ok) {
				setWatchlist(json.allStocks)
			}
			console.log(watchlist)
		}
		fetchWatchlist()
	}, [])

	return (
		<div className='relative text-white'>
			<div className='bg-primary border-b-[1px] mb-1 sticky top-0 grid grid-cols-3 justify-between p-2'>
				<h2 className=''>Ticker</h2>
				<h2 className=''>Price</h2>
			</div>
			{watchlist && watchlist.length > 1 ? (
				watchlist.map((stock) => (
					<p key={stock._id} className=''>
						{<WatchlistDetails ticker={stock.ticker}></WatchlistDetails>}
					</p>
				))
			) : (
				<p>Add stocks...</p>
			)}
		</div>
	)
}
