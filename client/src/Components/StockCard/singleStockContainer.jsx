import { useState, useEffect } from 'react'
// import components
import { StockMoreInfo } from './stockMoreInfo'
// import hooks
import { useWatchlistContext } from '../../Hooks/useWatchlistContext'
import { useAuthContext } from '../../Hooks/useAuthContext'
import { UseGetAPI } from '../../Hooks/useGetAPI'
// import utils
import { FetchCompanyProfile } from '../../utils/fetchCompanyProfile'
import { FetchCompanyDetails } from '../../utils/fetchCompanyDetails'
import { FetchStockPeers } from '../../utils/fetchStockPeers'
import { FetchStockRatings } from '../../utils/fetchStockRatings'
import { FetchSingleStockNews } from '../../utils/fetchStockNews'
// import icons and spinners
import Spinner from '../Spinners/spinner'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import { IoCloseOutline } from 'react-icons/io5'
import { AiOutlineArrowsAlt } from 'react-icons/ai'
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go'

/**
 * TODO:
 * - refactor fetch watchlist into own hook
 * - refactor single stock card into own component instead of the if else conditional statement
 * - refactor the many different useStates into one big useState that holds an object containing all the corresponding API fetch responses
 */
export default function SingleStockContainer({ name }) {
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
  const [open, setOpen] = useState(true)

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

  // event handlers
  const handleOnClick = () => {
    setToggle(!toggle)
  }
  const handleAdd = async () => {
    if (!user) {
      setError('You must be logged in to add a stock to your watchlist...')
      return
    }

    // fetch watchlists
    const ticker = `${name}`
    const endpoint = 'api/watchlist/'
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}${endpoint}`,
      {
        method: 'POST',
        body: JSON.stringify({ ticker: `${ticker}` }),
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
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

  let info

  if (!watchlist && !companyDetails) {
    info = null
  } else {
    info = (
      <span className='flex flex-col w-full h-full justify-center items-start border-2 border-primary  hover:border-2 hover:border-lightBlue transition delay-25 ease-in-out hover:rounded-lg '>
        <Spinner height={60} width={60} />
      </span>
    )
  }

  /**
   * stock more info NOT toggled
   */
  if (!toggle && companyDetails) {
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
        {stockData[0] && stockData[0]['changesPercentage'] && (
          <li
            className={`flex items-center h-full gap-1 text-xs md:text-base ${
              stockData[0]['changesPercentage'] > 0
                ? 'w-max bg-green rounded-md p-1'
                : 'w-max bg-red rounded-md p-1'
            }`}
          >
            ${stockData[0]['price']?.toFixed(2)}
            {stockData[0]['changesPercentage'] > 0 ? (
              <GoTriangleUp size={25}></GoTriangleUp>
            ) : (
              <GoTriangleDown size={25}></GoTriangleDown>
            )}
          </li>
        )}

        {/* display 24hr percentage change */}
        <li className={`text-xs md:text-base h-full items-center flex `}>
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
          <span>
            <AiOutlineArrowsAlt
              className='cursor-pointer md:hover:scale-110 transition text-lightBlue ease-in-out delay-25 hover:opacity-70 '
              onClick={handleOnClick}
              size={25}
            ></AiOutlineArrowsAlt>
          </span>
        </li>
      </ul>
    )
  } else if (toggle && companyDetails) {
    /**
     * stock more info toggled
     */
    info = (
      <div className='flex flex-col w-full pt-2 md:pt-0 transition delay-25 ease-in-out rounded-lg'>
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
            {stockData[0] && stockData[0]['changesPercentage'] && (
              <li
                className={`flex items-center h-full gap-1 text-xs md:text-base  ${
                  stockData[0]['changesPercentage'] > 0
                    ? 'w-max bg-green rounded-md p-1'
                    : 'w-max bg-red rounded-md p-1'
                }`}
              >
                ${stockData[0]['price']?.toFixed(2)}
                {stockData[0]['changesPercentage'] > 0 ? (
                  <GoTriangleUp size={25}></GoTriangleUp>
                ) : (
                  <GoTriangleDown size={25}></GoTriangleDown>
                )}
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
                  className='md:hover:scale-110 hover:opacity-70 transition text-lightBlue ease-in-out delay-25 cursor-pointer '
                  onClick={handleOnClick}
                  size={25}
                ></AiOutlineArrowsAlt>
              </span>
            </span>
          </ul>
          {error && (
            <Collapse in={open}>
              <Alert
                severity='warning'
                action={
                  <IconButton
                    aria-label='close'
                    color='inherit'
                    size='small'
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    <IoCloseOutline />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {error}
              </Alert>
            </Collapse>
          )}
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
  }
  return (
    <nav className='w-full h-full border-lightBlue hover:rounded-xl '>
      {info}

      {error && (
        <Collapse in={open}>
          <Alert
            severity='warning'
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setOpen(false)
                }}
              >
                <IoCloseOutline />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        </Collapse>
      )}
    </nav>
  )
}
