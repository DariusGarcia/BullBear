import React from 'react';

export default function Navigation() {
	return (
		<nav className='flex justify-evenly md:justify-between md:px-12 h-24 items-center font-primary bg-primary text-white '>
			<div className=''>
				<h1 className='mb-2 md:mb-0 text-2xl md:text-4xl font-bold tracking-wide cursor-pointer'>
					BullBear
				</h1>
			</div>
			<div className=''>
				<ul className='flex flex-row gap-4 md:text-lg md:gap-8'>
					<li className='cursor-pointer'>Market</li>
					<li className='cursor-pointer'>Portfolio</li>
					<li className='cursor-pointer'>Contact</li>
				</ul>
			</div>
		</nav>
	);
}
