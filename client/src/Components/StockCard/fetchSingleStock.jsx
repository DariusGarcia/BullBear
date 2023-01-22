import { useState, useEffect } from 'react'
import { useWatchlistContext } from '../../Hooks/useWatchlistContext'
import { FetchCompanyProfile } from '../../utils/fetchCompanyProfile'
import { FetchCompanyDetails } from '../../utils/fetchCompanyDetails'
import { UseGetAPI } from '../../Hooks/useGetAPI'
import { StockMoreInfo } from './stockMoreInfo'
import { AiOutlineArrowsAlt } from 'react-icons/ai'
import { useAuthContext } from '../../Hooks/useAuthContext'
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go'
import { FetchStockPeers } from '../../utils/fetchStockPeers'
import { FetchStockRatings } from '../../utils/fetchStockRatings'
import { FetchSingleStockNews } from '../../utils/fetchStockNews'

const endpoint = 'api/watchlist/'

const FetchSingleStock = (props) => {
  let { name } = props
  const { user } = useAuthContext()
  const { watchlist, dispatch } = useWatchlistContext()
  const [stockData, setStockData] = useState([{}])
  const [companyDetails, setCompanyDetails] = useState()
  const [companyProfile, setCompanyProfile] = useState()
  const [stockPeers, setStockPeers] = useState()
  const [stockRatings, setStockRatings] = useState()
  const [stockNews, setStockNews] = useState()

  const [toggle, setToggle] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    FetchSingleStockNews(name).then((name) => setStockNews(name))
    FetchStockRatings(name).then((name) => setStockRatings(name))
    FetchStockPeers(name).then((name) => setStockPeers(name))
    FetchCompanyDetails(name).then((name) => setCompanyProfile(name))
    FetchCompanyProfile(name).then((name) => setCompanyDetails(name))
    UseGetAPI(name)
      .then((res) => setStockData(res))
      .catch((error) => console.log(error))
  }, [name])

  const handleAdd = async () => {
    if (!user) {
      setError('You must be logged in to add a stock to your watchlist...')
      return
    }

    const ticker = `${name}`
    console.log('watchlist handleAddToWatchlist called')
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}${endpoint}`,
      {
        method: 'POST',
        body: JSON.stringify({ ticker: `${ticker}` }),
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
      }
    )

    const json = await response.json()

    if (!response.ok) {
      name = ''
      setError(json.error)
      return
    }

    if (response.ok) {
      dispatch({ type: 'ADD_STOCK', payload: json })
      setError(null)
      console.log('New stock added to watchlist')
    }
  }

  const handleOnClick = () => {
    setToggle(!toggle)
  }

  let info

  if (!watchlist && !companyDetails) {
    info = (
      <span className='flex w-full h-full justify-center items-center border-2 border-transparent hover:border-2 hover:border-lightBlue transition delay-75 ease-in-out hover:rounded-lg'>
        <p id='class-nf' className='w-full pl-2 text-red font-bold'>
          Invalid stock ticker...
        </p>
      </span>
    )
  } else {
    info = (
      <span className='flex w-full h-full justify-center items-center   border-2 border-primary  hover:border-2 hover:border-lightBlue transition delay-25 ease-in-out hover:rounded-lg '>
        <p id='class-nf' className='w-full pl-2 py-4 text-grey3'>
          Loading...
        </p>
      </span>
    )
  }

  if (name === null) {
    return
  }

  if (toggle && companyDetails) {
    info = (
      <div className='flex flex-col pt-2 md:pt-0 transition delay-25 ease-in-out rounded-lg  '>
        <div className=' w-full py-2 h-full'>
          <ul className='h-full grid grid-cols-4 md:mr-0 content-center text-white px-2'>
            {/* display stock ticker */}
            <div className='flex flex-col h-full md:pl-2 gap-2 md:gap-1 text-xs md:text-sm '>
              <article className='w-1/3 h-full flex flex-row gap-1'>
                <img
                  className='w-12 md:w-12 h-8 md:h-max rounded-lg'
                  src={companyDetails[0]?.image}
                  alt={companyDetails}
                ></img>
                <li className='text-xs md:text-base md:ml-14 h-full pl-1 md:pl-0 items-center flex'>
                  ${name || null}
                </li>
              </article>
            </div>

            {/* display current price */}
            {stockData[0] && stockData[0]['changesPercentage'] > 0 && (
              <li className='flex items-center h-full gap-1 text-xs md:text-base text-green '>
                ${stockData[0]['price']?.toFixed(2)}
                <GoTriangleUp size={25}></GoTriangleUp>
              </li>
            )}
            {stockData[0] && stockData[0]['changesPercentage'] < 0 && (
              <li className='flex items-center h-full gap-1 text-xs md:text-base text-red'>
                ${stockData[0]['price']?.toFixed(2)}
                <GoTriangleDown size={25}></GoTriangleDown>
              </li>
            )}

            {/* display 24hr percentage change */}
            <li className='flex h-full items-center text-xs md:text-base'>
              {stockData[0]['changesPercentage']?.toFixed(2)}%
            </li>

            <span className='flex flex-row md:gap-6 gap-4 items-center justify-around'>
              <span>
                <button
                  onClick={(event) => handleAdd(event)}
                  className='h-8 w-16 rounded-lg  bg-primary border-2 opacity-50 hover:border-lightBlue hover:opacity-100  delay-25 ease-in transition text-white'
                >
                  Add
                </button>
              </span>
              <span>
                <AiOutlineArrowsAlt
                  className='hover:scale-110 transition text-white ease-in-out delay-25 cursor-pointer '
                  onClick={handleOnClick}
                  size={25}
                ></AiOutlineArrowsAlt>
              </span>
            </span>
          </ul>
          {error && <p className='p-4 text-xs text-red font-bold '>{error}</p>}
          <div className='mt-4 ml-4 text-lg text-lightBlue'>
            {stockData[0]['name']}
          </div>
        </div>
        <div className='w-full mb-4'>
          {/* SHOW MORE INFO ABOUT STOCK SEARCHED*/}
          <StockMoreInfo
            stockNews={stockNews}
            stockRatings={stockRatings}
            stockPeers={stockPeers}
            companyProfile={companyProfile}
            stockData={stockData}
            companyDetails={companyDetails}
            ticker={name}
            openPrice={stockData[0]['open']}
            high={stockData[0]['dayHigh']}
            volume={stockData[0]['volume']?.toLocaleString()}
          />
        </div>
      </div>
    )
  } else if (!toggle && companyDetails) {
    info = (
      <ul className='h-16 grid w-full px-2 py-4 grid-cols-4 mr-2 md:mr-0 content-center text-white border-2transition delay-25 ease-in-out rounded-lg cursor-pointer'>
        {/* display stock ticker */}
        <div className='flex h-full items-center gap-x-2 md:gap-1 text-xs md:text-sm '>
          <li className='w-1/3'>
            <img
              className='w-max md:w-12 h-8 md:h-max md:mx-2 rounded-lg '
              src={companyDetails[0]?.image}
              alt={companyDetails}
            ></img>
          </li>
          <div className='flex flex-col text-xs md:text-base'>
            <span className='hidden md:inline text-lightBlue'>
              {stockData[0]['name']?.split(' ')[0]?.split(',')?.join('')}
            </span>
            <li className='text-xs md:text-base h-full items-center flex '>
              {name}
            </li>
          </div>
        </div>

        {/* display current price */}
        {stockData[0] && stockData[0]['changesPercentage'] > 0 && (
          <li className='text-xs md:text-base text-green h-full items-center flex gap-1  '>
            ${stockData[0]['price']?.toFixed(2)}
            <GoTriangleUp size={25}></GoTriangleUp>
          </li>
        )}
        {stockData[0] && stockData[0]['changesPercentage'] < 0 && (
          <li className='text-xs md:text-base text-red h-full items-center flex gap-1'>
            ${stockData[0]['price']?.toFixed(2)}
            <GoTriangleDown size={25}></GoTriangleDown>
          </li>
        )}
        {/* display 24hr percentage change */}
        <li className='text-xs md:text-base h-full items-center flex'>
          {stockData[0]['changesPercentage']?.toFixed(2)}%
        </li>

        <li className='text-md h-full md:gap-6 gap-4 items-center justify-around flex'>
          <span>
            <button
              onClick={(event) => handleAdd(event)}
              className='h-8 w-16 rounded-lg bg-primary border-2 opacity-50 hover:border-lightBlue hover:opacity-100  delay-25 ease-out transition text-white'
            >
              Add
            </button>
          </span>
          <span className=''>
            <AiOutlineArrowsAlt
              className='cursor-pointer hover:scale-110 transition text-white ease-in-out delay-25'
              onClick={handleOnClick}
              size={25}
            ></AiOutlineArrowsAlt>
          </span>
        </li>
      </ul>
    )
  }
  return (
    <nav className='w-full h-full border-lightBlue hover:rounded-xl '>
      {info}
      {error && <p className='p-4 text-xs text-red font-bold '>{error}</p>}
    </nav>
  )
}

export default FetchSingleStock
