import { useState, useEffect, useMemo } from 'react'
import { useWatchlistContext } from '../../Hooks/useWatchlistContext'
import { WatchlistDetails } from './watchlistDetails'
import { useAuthContext } from '../../Hooks/useAuthContext'
import { IoMdListBox } from 'react-icons/io'

const endpoint = 'api/watchlist'
const API = `${process.env.REACT_APP_BACKEND_API}${endpoint}`
const headerOptions = {
  'Content-Type': 'application/json',
}
/*
 * TODO: fix bug: user's watchlist doesn't persist when they logout and log back in.
 * dev network: endpoint is not receiving the auth JWT token so they watchlist cannot be accessed when first landing on dashaboard page
 * check client API fetch req or express endpoints/controller
 *
 */
export const Watchlist = () => {
  const { user } = useAuthContext()
  const { watchlist, dispatch } = useWatchlistContext()
  const [isLoading, setIsLoading] = useState(false)
  const data = useMemo(() => watchlist, [])

  // fetch user's watchlist that contains their added stocks from the backend server API.
  useEffect(() => {
    const fetchWatchlist = async () => {
      const response = await fetch(API, {
        headers: headerOptions,
      })
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
              className='bg-primary mb-4 w-full shadow-lg rounded-lg '
            >
              {
                <WatchlistDetails
                  watchlistInfo={stock._id}
                  companyProfile={stock.ticker}
                  ticker={stock.ticker}
                ></WatchlistDetails>
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
