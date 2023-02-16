import React from 'react'

export default function SimilarStocks({ stockPeers }) {
  return (
    stockPeers && (
      <section className='my-4 flex flex-col items-start md:w-full overflow-auto '>
        <h4 className='text-xl mb-2 '>Similar Stocks</h4>
        <ul className='grid grid-cols-4 md:flex md:flex-row gap-4 w-full overflow-auto md:w-full text-white md:text-base justify-center items-center'>
          {stockPeers[0].peersList.map((stock) => (
            <li
              key={stock.symbol}
              className='flex md:w-full bg-primary p-4 rounded-md justify-center items-center text-white  border-2 border-primary hover:border-2 hover:border-lightBlue transition ease-in-out delay-45'
            >
              ${stock}
            </li>
          ))}
        </ul>
      </section>
    )
  )
}
