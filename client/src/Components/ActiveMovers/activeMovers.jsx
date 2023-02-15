export default function ActiveMovers({ activeMoversData, query }) {
  activeMoversData &&
    console.log(`active movers: ${activeMoversData[0]?.ticker}`)
  return (
    activeMoversData && (
      <div className='w-full '>
        <div className='px-6 lg:px-8 '>
          <div className=''>
            <div className='w-full '>
              <h1 className='text-xl text-white'>{query.toUpperCase()}</h1>
              {/* <p className='mt-2 text-sm text-gray-700'>
                A list of all the users in your account including their name,
                title, email and role.
              </p> */}
            </div>
          </div>
          <div className='-mx-6 mt-8 sm:-mx-0'>
            <table className='min-w-full divide-y divide-grey100 '>
              <thead className='rounded-md bg-grey'>
                <tr>
                  <th
                    scope='col'
                    className='py-4 pl-6 pr-3 text-left text-sm text-white sm:pl-0'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className=' px-3 py-4 text-left text-sm text-white sm:table-cell'
                  >
                    Change %
                  </th>
                  <th
                    scope='col'
                    className=' px-3 py-4 text-left text-sm text-white lg:table-cell'
                  >
                    Price
                  </th>
                  <th
                    scope='col'
                    className='px-3 py-4 text-left text-sm text-white'
                  >
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-grey100 bg-grey3 rounded-md '>
                {activeMoversData.map((ticker) => (
                  <tr key={ticker.ticker}>
                    <td className='flex flex-col whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-white sm:pl-0'>
                      <div className='text-lightBlue font-bold'>
                        {' '}
                        ${ticker.ticker}
                      </div>
                      <div>{ticker.companyName}</div>
                    </td>
                    {/* <td className='whitespace-nowrap px-3 py-4 text-sm text-white sm:table-cell'> */}
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-white sm:table-cell'>
                      <span
                        className={
                          ticker?.changesPercentage > 0
                            ? 'bg-green p-2 rounded-md'
                            : 'bg-red p-2 rounded-md'
                        }
                      >
                        {parseInt(ticker.changesPercentage).toFixed(1)} %
                      </span>
                    </td>
                    <td className=' whitespace-nowrap px-3 py-4 text-sm text-white lg:table-cell'>
                      {ticker.price}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 text-sm text-white'>
                      {ticker.changes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  )
}
