import { useState, useEffect } from 'react'

export const StockMoreInfo = (props) => {
	const { openPrice, high, volume } = props
	return (
		<div className='grid grid-cols-2  w-1/3'>
			<ul className='flex flex-col text-white pl-2 text-xs md:text-lg'>
				{/* display stock ticker */}
				<li className='h-full items-center flex '>Opening</li>
				<li className=' hidden h-full items-center md:flex '>High</li>
				<li className='hidden h-full items-center md:flex '>Volume</li>
			</ul>
			<ul className='flex flex-col h-full content-center text-white px-2'>
				{/* display stock ticker */}
				<li className='h-full items-center flex '></li>
				<li className='h-full items-center flex '>${openPrice}</li>
				<li className='hidden h-full items-center md:flex '>${high}</li>
				<li className='hidden h-full items-center md:flex '>{volume}</li>
			</ul>
		</div>
	)
}
