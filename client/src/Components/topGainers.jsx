import { useEffect, useState, useMemo } from 'react'
import { UseFetchBroadMarketData } from '../Hooks/useFetchBroadMarketData'

export const TopGainers = () => {
	const [stocks, setStocks] = useState([])

	// useEffect(() => {
	// 	UseFetchBroadMarketData('gainers')
	// 		.then((res) => setStocks(res))
	// 		.then((res) => console.log(res))
	// 		.catch((error) => console.log(error))
	// }, [])

	const fetchData = useMemo(() => {
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
					<ol className='grid grid-cols-5 justify-center'>
						<li className='md:text-md text-lightBlue'>{stock.companyName}</li>
						<li>${stock.ticker}</li>
						<li>{stock.changesPercentage}%</li>
						<li>${stock.price}</li>
						<li>${stock.changes}</li>
					</ol>
				</article>
			))}
		</>
	)
}
