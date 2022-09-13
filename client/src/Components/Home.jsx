import { useState } from 'react'
// import { useWatchlistContext } from '../Hooks/useWatchlistContext'
import { CustomWatchlist } from './customWatchlist'
import SingleStockContainer from './singleStockContainer'

export default function Home() {
	const [value, setValue] = useState('')
	const [ticker, setTicker] = useState([])
	// const { watchlist, dispatch } = useWatchlistContext()

	const [refresh, setRefresh] = useState(false)

	const handleChange = (event) => {
		const stock = event.target.value.trim()
		setValue(stock)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if (!ticker.includes(value)) {
			setTicker(ticker.concat(value))
			setValue('')
		}
	}

	return (
		<div className='flex justify-evenly w-full h-screen overflow-x-scroll md:overflow-x-auto  items-center md:mt-0 bg-grey '>
			<div className='flex flex-col  w-full lg:w-5/6 md:flex-row px-4 md:justify-evenly '>
				{/*----------------------- nav-bar section ----------------------- */}
				<section className='flex flex-col md:h-full md:w-full  md:mb-1'>
					<form
						className='flex flex-col md:flex-row w-full h-max md:h-24 text-white md:items-start md:mb-3 pl-4 md:pl-0 md:gap-8 justify-start md:justify-between px-1 md:px-0'
						onSubmit={handleSubmit}>
						<h2 className=' mb-4 md:mb-0 md:text-2xl'>Stock Market</h2>
						<h3 className=' mb-4 md:mb-0 md:text-xl text-sm'>S&P500 index</h3>
						<input
							className='h-12 w-max md:w-47 rounded-md pl-2 mb-4 md:mb-0 active:outline-2 bg-opacity-20 placeholder-gainsboro text-black outline-lightBlue'
							value={value}
							onChange={handleChange}
							onInput={(e) =>
								(e.target.value = ('' + e.target.value).toUpperCase())
							}
							type='text'
							placeholder='e.g. MSFT'
							autoFocus
							aria-label='search stock ticker input'
						/>
						<button className='w-3/5 md:w-auto md:h-12 text-sm p-4 flex text-center justify-center items-center hover:scale-105 transition ease-in-out delay-25 bg-lightBlue bg-opacity-20 border-2 hover:bg-opacity-100 border-lightBlue text-white hover:text-white rounded-md mb-6 md:mb-0'>
							Search Ticker
						</button>
					</form>
					{/*----------------------- ticker info ----------------------- */}
					<div className='relative overflow-auto md:overflow-hidden w-max sm:w-full  rounded-xl '>
						<article className='w-full  px-0 rounded-xl shadow-2xl overflow-auto '>
							<nav className=' sticky top-0 bg-grey2 text-white z-50 h-12 rounded-xl w-full'>
								<ul className='grid grid-cols-5 self-center h-full md:px-0 px-2 '>
									<span className='px-2'>
										<li className='flex text-xs md:text-base w-1/7 h-full items-center '>
											Name
										</li>
									</span>
									<span className=' md:pl-2'>
										<li className='text-xs md:text-base w-1/7 h-full items-center flex'>
											Ticker
										</li>
									</span>

									<span className=''>
										<li className='text-xs md:text-base w-1/7 h-full items-center flex'>
											Current Price
										</li>
									</span>

									<span className=''>
										<li className='text-xs md:text-base w-1/7 h-full items-center flex'>
											24hr Change
										</li>
									</span>
								</ul>
							</nav>

							<div className='flex flex-col-reverse overflow-auto h-full   mt-4 pt-2 rounded-lg z-10 '>
								{ticker.map((enteredTicker) => (
									<SingleStockContainer
										name={enteredTicker}
										key={enteredTicker}></SingleStockContainer>
								))}
							</div>
						</article>
					</div>
				</section>
				{/*----------------------- Stocks watchlist section ----------------------- */}
				<section className=' w-full md:w-96 flex flex-col md:mt-0 justify-center h-max md:ml-4 text-white '>
					<header className='flex items-end md:items-start justify-center h-24 p-2 md:p-0 text-xl'>
						Watchlist
					</header>
					<article className='flex flex-col h-72 md:h-96 mb-12  m-2 md:m-0 md:p-0 bg-primary text-white rounded-xl '>
						{<CustomWatchlist refresh={refresh}></CustomWatchlist>}
					</article>
				</section>
			</div>
		</div>
	)
}
