import { useEffect, useState } from 'react'
import { UseFetchBroadMarketData } from '../Hooks/useFetchBroadMarketData'
import { GoTriangleUp } from 'react-icons/go'

export const TopGainers = () => {
  const [stocks, setStocks] = useState([])

  useEffect(() => {
    UseFetchBroadMarketData('gainers')
      .then((res) => setStocks(res))
      .catch((error) => console.log(error))
  }, [])

  return (
    <>
      {stocks.map((stock) => (
        <article
          key={stock.ticker}
          className='text-white w-full bg-primary my-2 px-2 py-4 h-max rounded-lg '
        >
          <ul className='grid grid-cols-2 items-center justify-center'>
            <span className='flex flex-col'>
              <li>{stock.ticker}</li>
              <li className='flex items-center text-xs w-5/6 flex-wrap md:text-base text-lightBlue'>
                {stock.companyName}
              </li>
            </span>
            <span className='flex flex-col'>
              <li className='flex flex-row gap-1 items-center text-green'>
                ${Number(stock.price)?.toFixed(2)}{' '}
                <GoTriangleUp size={25}></GoTriangleUp>
              </li>
              <li>{Number(stock.changesPercentage).toFixed(2)}%</li>
            </span>
          </ul>
        </article>
      ))}
    </>
  )
}
