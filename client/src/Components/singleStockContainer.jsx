import React, { useState } from 'react'

import FetchSingleStock from './fetchSingleStock'

export default function SingleStockContainer(props) {
	const { name } = props
	const [stockData, setStockData] = useState([{}])

	let info

	if (stockData) {
		info = <FetchSingleStock name={name} />
	} else if (stockData === null) {
		info = (
			<span className='flex w-full h-full justify-center items-center hover:border-2 border-lightBlue hover:rounded-xl '>
				<p id='class-nf' className='w-full pl-2 text-red font-bold'>
					Invalid stock ticker...
				</p>
			</span>
		)
	} else {
		info = (
			<p className='hover:border-2 border-lightBlue hover:rounded-xl'>
				Loading...
			</p>
		)
	}

	return (
		<div className='overflow-x-scroll md:overflow-x-hidden flex md:w-full my-4 text-sm md:text-base bg-primary mx-3 md:mx-0 rounded-xl'>
			{info}
		</div>
	)
}
