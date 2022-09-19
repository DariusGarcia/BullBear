import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './Hooks/useAuthContext'

import './App.css'

// pages & components
import Home from './Components/Home'
import Navbar from './Components/navbar'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Landing from './Pages/Landing'
import Footer from './Components/footer'

function App() {
	const { user } = useAuthContext()

	return (
		<>
			{/* <Navigation /> */}
			<Navbar />
			<div>
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route
						path='/login'
						element={!user ? <Login /> : <Navigate to='/dashboard' />}
					/>
					<Route path='/dashboard' element={<Home />} />
					<Route
						path='/signup'
						element={!user ? <Signup /> : <Navigate to='/dashboard' />}
					/>
				</Routes>
			</div>
			<Footer />
		</>
	)
}

export default App
