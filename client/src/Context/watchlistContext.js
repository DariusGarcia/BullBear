import { createContext, useReducer } from 'react'

export const WatchlistContext = createContext()

console.log('starting')
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

		default:
			return state
	}
}

export const WatchListContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(watchlistReducer, {
		watchlist: null,
	})

	return (
		<WatchlistContext.Provider value={{ ...state, dispatch }}>
			{children}
		</WatchlistContext.Provider>
	)
}
