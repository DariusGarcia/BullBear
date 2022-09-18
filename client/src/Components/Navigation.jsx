import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../Hooks/useLogout'
import { useAuthContext } from '../Hooks/useAuthContext'

export default function Navigation() {
	const { logout } = useLogout()
	const { user } = useAuthContext()

	const handleClick = () => {
		logout()
	}

	return (
		<div className='sticky top-0 flex justify-center z-50 bg-grey'>
			<nav className='flex h-16 w-full md:w-5/6 md:mb-12 md:mx-12 justify-evenly md:justify-between items-center font-primary bg-grey text-white '>
				<div className=''>
					<Link to='/'>
						<h1 className='mb-2 md:mb-0 text-2xl md:text-4xl font-bold tracking-wide cursor-pointer'>
							BullBear
						</h1>
					</Link>
				</div>
				<div className=''>
					<ul className='flex flex-row gap-4 text-sm md:text-lg cursor-pointer'>
						<Link to='/dashboard'>
							<li className=''>Market</li>
						</Link>
						{/* <li className=''>Portfolio</li> */}
						{!user && (
							<div className='flex flex-row gap-4'>
								<Link to='/login'>
									<li className=''>Login</li>
								</Link>
								<Link to='/signup'>
									<li className=''>Signup</li>
								</Link>
							</div>
						)}
						{user && (
							<div className='flex flex-row gap-4'>
								<span className=''>{user.email.split('@')[0]}</span>
								<button onClick={handleClick} className=''>
									Logout
								</button>
							</div>
						)}
					</ul>
				</div>
			</nav>
		</div>
	)
}
