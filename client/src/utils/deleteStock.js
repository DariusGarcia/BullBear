import { useState } from 'react'

export const DeleteStock = async (ticker) => {
	const [error, setError] = useState(null)

	const response = await fetch('http://localhost:4000/api/watchlist', {
		method: 'POST',
		// mode: 'cors',
		body: JSON.stringify({ ticker: `${ticker}` }),
		headers: { 'Content-Type': 'application/json' },
	})

	const json = await response.json()

	if (!response.ok) {
		setError(json.error)
	}

	if (response.ok) {
		setError(null)
		console.log('New stock added to watchlist')
	}
}
