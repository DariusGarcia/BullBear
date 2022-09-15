import { useState, useMemo, useEffect } from 'react'
import { useWatchlistContext } from '../Hooks/useWatchlistContext'
import { WatchlistDetails } from './watchlistDetails'

export const CustomWatchlist = () => {
	const { watchlist, dispatch } = useWatchlistContext()
	// const [watchlist, setWatchlist] = useState(null)

	// trying out use memo to see if it will stop the rerender when calling useEffect.
	// when watchlist is in useEffect's dependency array, it causes a nonstop rerender
	// need to include watchlist as variable so that page automatically rerenders when new stock is added to the custom watch list.
	// however, we need to make sure that the var in dep. array is a primitive type and nothing else. (Per Jack herrigntons youtube video)

	const data = useMemo(() => watchlist, [])

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
	}, [data])

	return (
		<div className=' text-white w-full  bg-grey rounded-lg '>
			<div className='w-full bg-grey2 mt-7 h-12 items-center mb-4 rounded-lg z-50 sticky top-0 grid grid-cols-3 justify-between px-2'>
				<h2 className=''>Ticker</h2>
				<h2 className=''>Price</h2>
				<h2 className=''>Delete </h2>
			</div>
			<ul className='bg-primary bg-opacity-20 overflow-y-auto h-96 rounded-lg'>
				{watchlist && watchlist.length > 1 ? (
					watchlist?.map((stock) => (
						<li
							key={stock._id}
							className='bg-primary h-16 mb-4 shadow-lg rounded-lg '>
							{<WatchlistDetails ticker={stock.ticker}></WatchlistDetails>}
						</li>
					))
				) : (
					<p>Add stocks...</p>
				)}
			</ul>
		</div>
	)
}
