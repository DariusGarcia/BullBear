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
				<article
					key={stock.ticker}
					className='text-white bg-primary my-2 px-2 py-4 rounded-lg '>
					<ul className='grid grid-cols-5 items-center justify-center'>
						<li className='flex items-center text-xs md:text-md text-lightBlue'>
							{stock.companyName}
						</li>
						<li>${stock.ticker}</li>
						<li>{Number(stock.changesPercentage).toFixed(2)}%</li>
						<li>${Number(stock.price)?.toFixed(2)}</li>
						<li>${Number(stock.changes)?.toFixed(2)}</li>
					</ul>
				</article>
			))}
		</>
	)
}
