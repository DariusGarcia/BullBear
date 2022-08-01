import { useState, useEffect, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// pages & components
import Home from './Components/Home'
import Navigation from './Components/Navigation'
import Signup from './Pages/Signup'
import Login from './Pages/Login'

function App() {
	return (
		<>
			<Navigation />
			<div>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
				</Routes>
			</div>
		</>
	)
}

export default App
