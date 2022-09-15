import { createContext, useReducer, useMemo } from 'react'

export const WatchlistContext = createContext()

export const watchlistReducer = (state, action) => {
	switch (action.type) {
		case 'SET_WATCHLIST':
			return {
				watchlist: action.payload,
			}
		case 'ADD_STOCK':
			return {
				watchlist: [action.payload, ...state.watchlist],
			}
		case 'DELETE_STOCK':
			return {
				watchlist: state.watchlist.filter((w) => w._id !== action.payload._id),
			}

		default:
			return state
	}
}

export const WatchListContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(watchlistReducer, {
		watchlist: {},
	})

	const data = useMemo(() => ({ ...state, dispatch }), [state])

	return (
		<WatchlistContext.Provider value={data}>
			{children}
		</WatchlistContext.Provider>
	)
}
