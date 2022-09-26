import { useMemo, useEffect, useState } from 'react'
import { useWatchlistContext } from '../Hooks/useWatchlistContext'
import { WatchlistDetails } from './watchlistDetails'
import { useAuthContext } from '../Hooks/useAuthContext'
import { IoMdListBox } from 'react-icons/io'
import { FetchCompanyProfile } from '../utils/fetchCompanyProfile'
import { UseGetAPI } from '../Hooks/useGetAPI'

export const Watchlist = () => {
	const { user } = useAuthContext()
	const { watchlist, dispatch } = useWatchlistContext()

	const data = useMemo(() => watchlist, [])

	// fetch user's watchlist that containers their added stocks from the backend server API.
	useEffect(() => {
		const fetchWatchlist = async () => {
			const response = await fetch(
				'https://bullbear-server.herokuapp.com/api/watchlist',
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
						'Access-Control-Allow-Headers':
							'Origin, Content-Type, X-Auth-Token',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
					},
				}
			)
			const json = await response.json()
			if (response.ok) {
				dispatch({ type: 'SET_WATCHLIST', payload: json.allStocks })
			}
		}

		if (user) {
			fetchWatchlist()
		}
	}, [data, dispatch, user])

	return (
		<div className=' text-white w-full  rounded-lg px-2 md:px-0 '>
			<div className='sticky top-0 grid grid-cols-3 justify-between md:px-2 w-full mt-2 md:mt-3 h-12 items-center mb-4 bg-grey rounded-lg z-20 '>
				<h2 className='flex justify-start md:p-0 pl-2 md:pl-0 gap-2 items-center md:items-end text-xl'>
					Watchlist <IoMdListBox size={30} className='text-white' />
				</h2>
			</div>
			<ul className='overflow-y-auto h-96 rounded-lg'>
				{watchlist && watchlist.length >= 1 ? (
					watchlist?.map((stock) => (
						<li
							key={stock._id}
							className='bg-primary mb-4 w-full shadow-lg rounded-lg '>
							{
								<WatchlistDetails
									watchlistInfo={stock._id}
									companyProfile={stock.ticker}
									ticker={stock.ticker}></WatchlistDetails>
							}
						</li>
					))
				) : (
					<p className='p-4'>
						{user ? 'Add stocks...' : 'Login to add to watchlist...'}
					</p>
				)}
			</ul>
		</div>
	)
}
