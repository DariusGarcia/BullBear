import { WatchlistContext } from '../Context/watchlistContext'
import { useContext } from 'react'

export const useWatchlistContext = () => {
  const context = useContext(WatchlistContext)

  if (!context) {
    throw Error(
      'useWatchlistContext must be used inside an instance of WatchlistContext'
    )
  }

  return context
}
