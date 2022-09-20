import React from 'react'
import { Watchlist } from './watchlist'

export default function WatchlistContainer() {
	return (
		<article className='flex flex-col md:p-0  bg-red text-white rounded-xl '>
			{<Watchlist></Watchlist>}
		</article>
	)
}
