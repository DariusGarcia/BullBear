import './App.css';
import Navigation from './Components/Navigation';
import Login from './Components/Login';
import Home from './Components/Home';
import RoutesComp from './Routes';
import { useState, useEffect, createContext } from 'react';
import Signup from './Components/Signup';

export const UserContext = createContext({});

function App() {
	const [loading, setLoading] = useState(true);
	const [userSession, setUserSession] = useState(true);

	useEffect(() => {
		const fetchUserAuth = async () => {
			try {
				setLoading(true);
				const res = await fetch('/api/isAuth');
				if (!res.ok) return setLoading(false);

				setUserSession(await res.json());
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.error('There was an error fetch auth', error);
				return;
			}
		};
		fetchUserAuth();
	}, []);

	return (
		<>
			<Home />
			{/* <Signup /> */}
			{/* <Login /> */}
			{/* <UserContext.Provider value={userSession}> */}
			{/* {loading ? <>loading...</> : <RoutesComp />} */}
			{/* <Home /> */}
			{/* </UserContext.Provider> */}
		</>
	);
}

export default App;
