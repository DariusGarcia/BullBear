import React, { useState, useEffect } from 'react'

import SingleStock from '../Components/singleStock'

function FetchStocks(props) {
	const { name, toggle } = props
	const [stockData, setStockData] = useState([{}])

	// useEffect(() => {
	// 	fetchDataInfo(name)
	// 		.then((data) => {
	// 			setStockData(data.quote)
	// 			setLoading(false)
	// 		})
	// 		.catch((error) => console.log(error))
	// }, [name])

	let info

	if (stockData) {
		info = <SingleStock toggle={toggle} name={name} />
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

export default FetchStocks
