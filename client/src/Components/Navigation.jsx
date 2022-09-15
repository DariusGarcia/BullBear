import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
	return (
		<div className='flex justify-center'>
			<nav className='flex justify-evenly md:justify-between h-16 md:mb-12 w-full md:mx-12 items-center font-primary bg-grey text-white '>
				<div className=''>
					<Link to='/'>
						<h1 className='mb-2 md:mb-0 text-2xl md:text-4xl font-bold tracking-wide cursor-pointer'>
							BullBear
						</h1>
					</Link>
				</div>
				<div className=''>
					<ul className='flex flex-row gap-4 text-sm md:text-lg md:gap-8'>
						<li className='cursor-pointer'>Market</li>
						<li className='cursor-pointer'>Portfolio</li>
						<Link to='/login'>
							<li className='cursor-pointer'>Login</li>
						</Link>
						<Link to='/signup'>
							<li className='cursor-pointer'>Signup</li>
						</Link>
					</ul>
				</div>
			</nav>
		</div>
	)
}
