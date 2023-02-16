import formatTime from '../../utils/formatTime'

export default function CompanyStats({
  companyDetails,
  companyProfile,
  stockData,
  ticker,
}) {
  /**
   * function to find the index of the stock that is being searched and fetched from API.
   * index used for companyProfile to find the sector, sub-sector, and founded.
   */
  function findId(ticker) {
    const ID = companyProfile.map((el) => el.symbol).indexOf(ticker)
    return ID
  }

  return (
    companyDetails && (
      <>
        <h4 className='mt-4 md:mt-0 mb-2 text-xl'>Stats</h4>
        <section className='grid grid-cols-2 overflow-x-auto bg-primary p-2 rounded-lg'>
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
        </section>
      </>
    )
  )
}
