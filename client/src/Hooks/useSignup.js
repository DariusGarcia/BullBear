import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(null)
	const { dispatch } = useAuthContext()

	const signup = async (email, password) => {
		setIsLoading(true)
		setError(null)
		const response = await fetch(
			'https://bull-bear-pi.vercel.app/api/user/signup',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				},
				body: JSON.stringify({ email, password }),
			}
		)

		const json = await response.json()

		if (!response.ok) {
			setIsLoading(false)
			setError(json.error)
		}

		if (response.ok) {
			// save the user to local storage using the jwt token
			localStorage.setItem('user', JSON.stringify(json))

			// update the auth context using useAuthContext hook
			dispatch({ type: 'LOGIN', payload: json })
			setIsLoading(false)
		}
	}

	return { signup, isLoading, error }
}