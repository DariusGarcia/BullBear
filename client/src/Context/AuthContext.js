import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			}
		case 'LOGOUT':
			return {
				...state,
				isAuthenticated: false,
				user: null,
			}
		default:
			return state
	}
}
export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		// isAuthenticated: false,
		// token: '',
	})

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'))

		if (user) {
			dispatch({ type: 'LOGIN', payload: user })
		}
	}, [])

	console.log('AuthContext state', state)

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}
