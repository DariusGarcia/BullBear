import { useAuthContext } from './useAuthContext'
import { useWatchlistContext } from './useWatchlistContext'

export const useLogout = () => {
	const { dispatch } = useAuthContext()
	const { dispatch: watchlistDispatch } = useWatchlistContext()

	const logout = () => {
		// remove user from local storage
		localStorage.removeItem('user')
		console.log('logged out')

		// dispatch LOGOUT action
		dispatch({ type: 'LOGOUT' })
		watchlistDispatch({ type: 'SET_WATCHLIST', payload: null })
	}

	return { logout }
}
