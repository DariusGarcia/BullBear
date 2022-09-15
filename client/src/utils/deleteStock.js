import { useState } from 'react'
import { useWatchlistContext } from '../Hooks/useWatchlistContext'

export const DeleteStock = async (ticker) => {
	const { dispatch } = useWatchlistContext()

	const [error, setError] = useState(null)

	const response = await fetch(
		`http://localhost:4000/api/watchlist/${ticker._id}`,
		{
			method: 'DELETE',
		}
	)

	const json = await response.json()

	if (!response.ok) {
		setError(json.error)
	}

	if (response.ok) {
		setError(null)
		dispatch({ type: 'DELETE_STOCK', payload: json })
		console.log('New stock added to watchlist')
	}
}
