import formatTime from '../../utils/formatTime'

export default function CompanyInfo({
  companyDetails,
  companyProfile,
  stockData,
  ticker,
}) {
  /**
   * function to find the index of the stock that is being searched and fetched from API.
   * index used for companyProfile to find the sector, subsector, and founded.
   */
  function findId(ticker) {
    const ID = companyProfile.map((el) => el.symbol).indexOf(ticker)
    return ID
  }

  return (
    <>
      {' '}
      <h2 className='my-2 text-lg'>Company Info</h2>
      <section className='grid grid-cols-2 mb-0 md:mb-4 gap-y-4 bg-primary p-2 rounded-lg'>
        <article className=''>
          <p className='opacity-70'>CEO</p>
          <p className=''>{companyDetails[0]?.ceo}</p>
        </article>
        <article className=''>
          <p className='opacity-70'>Employees</p>
          <p className=''>
            {companyDetails[0]?.fullTimeEmployees.toLocaleString()}
          </p>
        </article>
        <article className=''>
          <p className='opacity-70'>IPO Date</p>
          <p className=''>{formatTime(companyDetails[0]?.ipoDate)}</p>
        </article>
        <article className=''>
          <p className='opacity-70'>Headquarters</p>
          <p className=''>{companyDetails[0]?.city}</p>
        </article>
        <article className=''>
          <p className='opacity-70'>Industry</p>
          <p className=''>
            {companyDetails[0]['industry'] ||
              companyProfile[findId(ticker)]?.sector}
          </p>
        </article>{' '}
        <article className=''>
          <p className='opacity-70'>Website</p>
          <a
            href={companyDetails[0]['website'] || '-'}
            className='hover:opacity-70 text-blue hover:underline'
          >
            {companyDetails[0]['website'] || '-'}{' '}
          </a>
        </article>
      </section>
      <h4 className='text-xl mb-2'>Stats</h4>
      <div className='grid grid-cols-2 overflow-x-auto bg-primary p-2 rounded-lg'>
        <div className='flex flex-row gap-x-2 md:gap-x-4'>
          <ul className='flex flex-col text-white  md:text-base opacity-70'>
            <li key='stats-open' className='h-full  items-center flex '>
              Open
            </li>
            <li key='stats-high' className=' h-full  items-center flex '>
              High
            </li>
            <li key='stats-low' className=' h-full  items-center flex '>
              Low
            </li>
            <li key='stats-52wkhigh' className=' h-full  items-center flex '>
              52 Wk high
            </li>
            <li key='stats-52wklow' className=' h-full  items-center flex '>
              52 Wk low
            </li>
          </ul>
          <ul className='flex flex-col w-max h-full  items-start justify-center text-white px-2'>
            <li key='stats-1' className='h-full items-center flex '>
              ${stockData[0].open.toFixed(2)}
            </li>
            <li key='stats-2' className=' h-full items-center flex '>
              ${stockData[0].dayHigh.toFixed(2)}
            </li>
            <li key='stats-3' className=' h-full items-center flex '>
              ${stockData[0].dayLow.toFixed(2)}
            </li>
            <li key='stats-4' className='h-full items-center md:flex '>
              ${stockData[0].yearHigh.toFixed(2)}
            </li>
            <li key='stats-5' className='h-full items-center md:flex '>
              ${stockData[0].yearLow.toFixed(2)}
            </li>
          </ul>
        </div>
        <div className='flex flex-row gap-x-2 md:gap-x-4'>
          <ul className='flex flex-col text-white  md:text-base opacity-70'>
            <li key='stats-volume' className='h-full  items-center flex '>
              Volume
            </li>
            <li
              key='stats avg vol'
              className='h-full  w-max items-center flex text-sm md:text-base'
            >
              Avg volume
            </li>
            <li key='p/e/ ratio' className='h-full  w-max items-center flex '>
              P/E ratio
            </li>
            <li key='mkt cap' className='h-full  items-center flex '>
              Mkt cap
            </li>
            <li
              key='date Added'
              className='h-full  items-center flex text-xs md:text-base '
            >
              Date added
            </li>
          </ul>
          <ul className='flex flex-col w-max h-full items-start justify-center text-white px-2'>
            <li key='vol data ' className=' h-full items-center flex '>
              {stockData[0].volume.toLocaleString()}
            </li>
            <li key='avg vol data' className='h-full items-center flex '>
              {stockData[0].avgVolume.toLocaleString()}
            </li>
            <li key='date added data' className=' h-full items-center flex '>
              {Number(stockData[0]['pe']).toFixed(0)}
            </li>
            <li
              key='mkt cap data '
              className='flex h-full items-center text-base'
            >
              ${companyDetails[0]['mktCap']?.toLocaleString()}
            </li>
            <li
              key='date first added data '
              className='flex flex-wrap h-full  w-max items-center text-sm md:text-base'
            >
              {formatTime(companyProfile[findId(ticker)]?.dateFirstAdded) ||
                '-'}
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
