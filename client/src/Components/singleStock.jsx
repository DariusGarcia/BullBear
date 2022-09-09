import { useState, useEffect } from 'react'
import { UseGetAPI } from '../Hooks/useGetAPI'

const handleAdd = () => {}

const SingleStock = (props) => {
	const [toggle, setToggle] = useState(false)
	const { name } = props
	const [stockData, setStockData] = useState([{}])

	useEffect(() => {
		UseGetAPI(name)
			.then((res) => setStockData(res))
			.catch((error) => console.log(error))
	}, [name])

	return (
		<nav className='w-full hover:border-2 border-lightBlue hover:rounded-xl '>
			<ul className='h-full grid grid-cols-8 content-center text-white px-2'>
				{/* display stock ticker */}
				<li className='text-xs  md:text-lg  text-lightBlue h-full items-center flex '>
					${name}
				</li>
				<li className='text-xs  md:text-sm  text-lightBlue h-full items-center flex '>
					{stockData[0]['name']}
				</li>
				{/* display current price */}
				<li className='text-xs md:text-base h-full items-center flex  '>
					${stockData[0]['price']}
				</li>
				{/* display ticker opening price */}
				<li className='text-xs md:text-base h-full items-center flex '>
					${stockData[0]['open']}
				</li>
				{/* display ticker prev day price */}
				<li className='text-xs md:text-base h-full items-center flex '>
					$ {stockData[0]['previousClose']}
				</li>
				{/* display 24hr percentage change */}
				<li className='text-xs md:text-base h-full items-center flex  '>
					{stockData[0]['changesPercentage']?.toFixed(2)}%
				</li>
				{/* display stock daily volume */}
				<li className='text-xs md:text-base h-full items-center flex  '>
					{stockData[0]['volume']?.toLocaleString()}
				</li>
				<li className='text-xs md:text-base h-full items-center flex '>
					<button onClick={handleAdd} className='bg-grey'>
						Add stock
					</button>
				</li>
			</ul>
		</nav>
	)
}

export default SingleStock
