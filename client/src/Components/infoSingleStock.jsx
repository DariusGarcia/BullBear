import { useState, useEffect } from 'react'

export const InfoSingleStock = (props) => {
	const { openPrice, high, volume } = props
	return (
		<div className='flex flex-col gap-4 mt-2'>
			<ul className='grid grid-cols-5 content-center text-white px-2 text-xs md:text-lg'>
				{/* display stock ticker */}
				<li className='h-full items-center flex '></li>
				<li className='h-full items-center flex '>Open</li>
				<li className=' hidden h-full items-center md:flex '>High</li>
				<li className='hidden h-full items-center md:flex '>Volume</li>
			</ul>
			<ul className='grid grid-cols-5 content-center text-white px-2'>
				{/* display stock ticker */}
				<li className='h-full items-center flex '></li>
				<li className='h-full items-center flex '>${openPrice}</li>
				<li className='hidden h-full items-center md:flex '>${high}</li>
				<li className='hidden h-full items-center md:flex '>{volume}</li>
			</ul>
		</div>
	)
}
