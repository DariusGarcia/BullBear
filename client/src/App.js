import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './Hooks/useAuthContext'

import './App.css'

// pages & components
import Dashboard from './Components/dashboard'
import Home from './Components/Home'
import Navigation from './Components/Navigation'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Landing from './Pages/Landing'

function App() {
	const { user } = useAuthContext()

	return (
		<>
			<Navigation />
			<div>
				<Routes>
					<Route
						path='/'
						// element={user ? <Home /> : <Navigate to='/login' />}
						element={user ? <Landing /> : <Navigate to='/login' />}
					/>
					<Route
						path='/login'
						element={!user ? <Login /> : <Navigate to='/' />}
					/>
					<Route path='/dashboard' element={<Home />} />
					<Route
						path='/signup'
						element={!user ? <Signup /> : <Navigate to='/' />}
					/>
				</Routes>
			</div>
		</>
	)
}

export default App
