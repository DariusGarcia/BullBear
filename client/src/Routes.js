import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Pages/Signup2'

import { UserContext } from './App'

function RoutesComp() {
	const userContext = useContext(UserContext)
	return (
		<>
			<Routes>
				{userContext.email && (
					<Route
						path='/'
						element={
							<div className='text-white'>Welcome {userContext.email}</div>
						}
					/>
				)}
				{!userContext.email && (
					<>
						<Route path='/' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
					</>
				)}
			</Routes>
		</>
	)
}

export default RoutesComp
