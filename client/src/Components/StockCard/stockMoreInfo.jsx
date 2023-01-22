import { useState } from 'react'
import formatTime from '../../utils/formatTime'
import time_ago from '../../utils/timeSincePublished'
import StockChart from './stockChart'
export const StockMoreInfo = (props) => {
  const {
    stockNews,
    stockData,
    companyDetails,
    companyProfile,
    ticker,
    stockPeers,
    stockRatings,
  } = props
  const [toggle, setToggle] = useState(false)

  // function to find the index of the stock that is being searched and fetched from API.
  // index used for companyProfile to find the sector, subsector, and founded.
  function findId(ticker) {
    const ID = companyProfile.map((el) => el.symbol).indexOf(ticker)

    return ID
  }

  return (
    <>
      {findId &&
        companyDetails &&
        companyDetails.length > 0 &&
        stockPeers &&
        stockRatings && (
          <div className='px-4 text-white w-full  h-full overflow-hidden'>
            <article className='w-full h-full mb-4' id='stock-chart'>
              <StockChart stock={ticker} />
            </article>
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
                  <li
                    key='stats-52wkhigh'
                    className=' h-full  items-center flex '
                  >
                    52 Wk high
                  </li>
                  <li
                    key='stats-52wklow'
                    className=' h-full  items-center flex '
                  >
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
                  <li
                    key='p/e/ ratio'
                    className='h-full  w-max items-center flex '
                  >
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
                  <li
                    key='date added data'
                    className=' h-full items-center flex '
                  >
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
                    {formatTime(
                      companyProfile[findId(ticker)]?.dateFirstAdded
                    ) || '-'}
                  </li>
                </ul>
              </div>
            </div>
            {/* Displays similar stocks */}
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
            <section className='md:flex md:flex-row my-4 justify-between gap-8'>
              {/* Displays stock ratings */}
              <article className='flex flex-col  items-start mb-8 md:mb-0 '>
                <h4 className='text-xl mb-2 '>Analyst Ratings</h4>
                <ul className='flex flex-col w-full md:w-max gap-4 text-white md:text-base  bg-primary p-4 rounded-lg'>
                  <li
                    key='stock recommendation'
                    className={
                      stockRatings[0]?.ratingScore >= 4
                        ? 'rounded-md text-green'
                        : 'rounded-md text-red'
                    }
                  >
                    <span className='opacity-70 text-white'>
                      Recommendation:
                    </span>{' '}
                    {stockRatings[0]?.ratingRecommendation}
                  </li>
                  <li
                    key='stockRating score'
                    className={
                      stockRatings[0]?.ratingScore >= 4
                        ? 'rounded-md text-green'
                        : 'rounded-md text-red'
                    }
                  >
                    <span className='opacity-70 text-white'>Rating score:</span>{' '}
                    {stockRatings[0]?.ratingScore}
                  </li>
                  <li key='stockRating' className='flex '>
                    {formatTime(stockRatings[0]?.date)}
                  </li>
                </ul>
              </article>
              {/* Displays stock news articles */}
              <article className='flex w-full flex-col items-start h-[400px] md:h-[550px]  '>
                <h4 className='text-xl mb-2 '>Recent News</h4>
                <div className='flex flex-col  gap-4 text-white md:text-base rounded-lg overflow-auto'>
                  {stockNews.map((newsArticle) => (
                    <a
                      target='_blank'
                      href={newsArticle.url}
                      rel='noreferrer'
                      className='hover:opacity-60 ease-in transition duration-75 '
                    >
                      <article
                        key={newsArticle.id}
                        className='rounded-lg shadow-lg '
                      >
                        <ul className='grid grid-cols-2  bg-primary my-0  p-2 gap-y-2 gap-4 rounded-lg md:mr-4  '>
                          <div className='flex flex-col justify-evenly'>
                            <li key='article-site' className='text-lightBlue '>
                              {newsArticle.site}
                            </li>
                            <li
                              key='article-title'
                              className='text-xs md:text-base '
                            >
                              {newsArticle.title}
                            </li>

                            <li
                              key='news-text'
                              className='hidden md:block italic text-sm opacity-70'
                            >
                              {newsArticle.text?.substring(0, 100)}...
                            </li>
                            <li
                              key='article-publishedDate'
                              className='text-sm opacity-50 flex flex-row'
                            >
                              {time_ago(newsArticle.publishedDate)}
                            </li>
                          </div>
                          <div className=''>
                            {' '}
                            <li
                              key='article-image'
                              className='flex justify-end h-full items-center'
                            >
                              <img
                                className='w-32 h-32 md:w-56 md:h-40 p-4 rounded-md object-cover'
                                src={newsArticle.image}
                                alt={newsArticle.title}
                              ></img>
                            </li>
                          </div>
                        </ul>
                      </article>
                    </a>
                  ))}
                </div>
              </article>
            </section>
            {/* About the stock section*/}
            <section className='mt-8'>
              <span className='flex flex-row justify-between'>
                <h3 className='text-xl border-b-2 border-lightBlue mb-4'>
                  About {companyDetails[0]['companyName']}
                </h3>
              </span>
              {!toggle ? (
                <p className=''>
                  {companyDetails[0]['description']
                    .substring(0, 350)
                    .concat('...')}
                </p>
              ) : (
                <p className=''>{companyDetails[0]['description']}</p>
              )}
              <button
                className='border-b-2 border-lightBlue text-lightBlue text-sm mt-2 pb-1 hover:opacity-70 ease-in transition duration-75 '
                onClick={() => setToggle(!toggle)}
              >
                {!toggle ? 'Show more' : 'Show less'}
              </button>
            </section>
          </div>
        )}
    </>
  )
}