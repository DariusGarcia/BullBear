import { useEffect, useState } from 'react'
import { UseFetchBroadMarketData } from '../Hooks/useFetchBroadMarketData'

export const TopGainers = () => {
	const [stocks, setStocks] = useState([])

	useEffect(() => {
		UseFetchBroadMarketData('gainers')
			.then((res) => setStocks(res))
			.then((res) => console.log(res))
			.catch((error) => console.log(error))
	}, [])
	return (
		<>
			{stocks.map((stock) => (
				<article className='text-white bg-primary my-2 px-2 py-4 rounded-lg '>
					<ul
						key={stock.ticker}
						className='grid grid-cols-5 justify-center list-none'>
						<li className='text-lg text-lightBlue'>{stock.companyName}</li>
						<li>${stock.ticker}</li>
						<li>{stock.changesPercentage}%</li>
						<li>${stock.price}</li>
						<li>${stock.changes}</li>
					</ul>
				</article>
			))}
		</>
	)
}
