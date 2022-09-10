import { useState, useEffect } from 'react'
import { UseGetAPI } from '../Hooks/useGetAPI'
import { InfoSingleStock } from './infoSingleStock'
import { MdOutlineOpenInFull } from 'react-icons/md'
const handleAdd = () => {}

// const firstWord = async (sentence) => {
// 	let str = sentence
// 	let res = await str.split(' ')[0]

// 	return res
// }

const SingleStock = (props) => {
	const [open, setOpen] = useState(false)
	const { name, toggle } = props
	const [stockData, setStockData] = useState([{}])

	useEffect(() => {
		UseGetAPI(name)
			.then((res) => setStockData(res))
			.catch((error) => console.log(error))
	}, [name])

	let info

	if (toggle) {
		info = (
			<div className='w-full py-2'>
				<ul className='h-full grid grid-cols-5 content-center text-white px-2'>
					{/* display stock ticker */}
					<li className='text-xs  md:text-lg  text-lightBlue h-full items-center flex '>
						${name}
					</li>
					<li className='text-xs hidden md:text-sm h-full items-center md:flex '>
						{stockData[0]['name']}
					</li>
					{/* display current price */}
					<li className='text-xs md:text-base h-full items-center flex  '>
						${stockData[0]['price']}
					</li>

					{/* display 24hr percentage change */}
					<li className='text-xs md:text-base h-full items-center flex  '>
						{stockData[0]['changesPercentage']?.toFixed(2)}%
					</li>

					<li className='text-xs justify-evenly  md:text-base h-full gap-4 items-center flex '>
						<button
							onClick={handleAdd}
							className='p-2 rounded-lg bg-grey text-black'>
							Add
						</button>
						<MdOutlineOpenInFull size={25}></MdOutlineOpenInFull>
					</li>
				</ul>
				<div className='w-full'>
					<InfoSingleStock
						openPrice={stockData[0]['open']}
						high={stockData[0]['dayHigh']}
						volume={stockData[0]['volume']?.toLocaleString()}
					/>
				</div>
			</div>
		)
	} else if (!toggle) {
		info = (
			<ul className='h-full grid p-2 grid-cols-5 content-center text-white'>
				{/* display stock ticker */}
				<li className='text-xs md:text-lg text-lightBlue h-full items-center flex '>
					${name}
				</li>
				<li className='text-xs hidden md:text-sm h-full items-center md:flex '>
					{stockData[0]['name']}
				</li>
				{/* display current price */}
				<li className='text-xs md:text-base h-full items-center flex'>
					${stockData[0]['price']}
				</li>
				{/* display 24hr percentage change */}
				<li className='text-xs md:text-base h-full items-center flex'>
					{stockData[0]['changesPercentage']?.toFixed(2)}%
				</li>
				<li className='justify-evenly text-xs md:text-base h-full gap-4 items-center flex'>
					<button
						onClick={handleAdd}
						className='p-2 rounded-lg bg-grey text-black'>
						Add
					</button>
					<MdOutlineOpenInFull size={25}></MdOutlineOpenInFull>
				</li>
			</ul>
		)
	}
	return (
		<nav className='w-full h-full border-lightBlue hover:rounded-xl '>
			{info}
		</nav>
	)
}

export default SingleStock
