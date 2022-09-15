import { useState } from 'react'
import { CustomWatchlist } from './customWatchlist'
import SingleStockContainer from './singleStockContainer'
import { TopGainers } from './topGainers'

export default function Home() {
	const [value, setValue] = useState('')
	const [ticker, setTicker] = useState([])

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
		<div className='flex w-full h-full mt-4 md:mt-0 items-center justify-evenly overflow-x-scroll md:overflow-x-auto bg-grey'>
			<div className='flex flex-col w-full lg:w-5/6 px-4 md:px-0 md:justify-evenly '>
				<div className='flex flex-col w-full md:flex-row  md:px-0 md:justify-evenly '>
					{/*----------------------- nav-bar section ----------------------- */}
					<section className='flex flex-col md:h-full md:w-full md:mb-1'>
						<form
							className='flex flex-col md:flex-row w-full h-max md:h-16 text-white md:items-center md:mb-3 md:pl-0 md:gap-24 justify-start md:justify-start px-1 md:px-0'
							onSubmit={handleSubmit}>
							<header className='flex gap-2 md:gap-0 flex-row items-center md:items-start md:flex-col'>
								<h2 className='mb-4 md:mb-0 md:text-2xl'>Stock Market</h2>
								<h3 className='mb-4 md:mb-0 md:text-xl text-sm text-grey2 '>
									S&P500 index
								</h3>
							</header>
							<input
								className='h-12 w-max md:w-72 rounded-md pl-2 mb-4 md:mb-0 active:outline-2 bg-opacity-20 placeholder-gainsboro text-black outline-lightBlue'
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
							<button className='w-3/5 md:w-auto md:h-12 text-sm p-4 flex text-center justify-center items-center hover:scale-105 transition ease-in-out delay-25 bg-lightBlue bg-opacity-20 border-2 hover:bg-opacity-100 border-lightBlue text-white hover:text-white rounded-lg mb-6 md:mb-0'>
								Search Ticker
							</button>
						</form>
						{/*----------------------- ticker info ----------------------- */}
						<div className='relative h-screen overflow-auto bg-opacity-20 md:overflow-hidden w-max sm:w-full mt-4 rounded-lg '>
							<article className='w-full px-0 rounded-lg overflow-auto h-max '>
								<nav className=' sticky top-0 bg-grey2 text-white z-50 h-12 rounded-lg w-full'>
									<ul className='grid grid-cols-5 self-center h-full md:px-0 px-2 '>
										<span className='pl-2'>
											<li className='flex text-xs md:text-base  h-full items-center '>
												Name
											</li>
										</span>
										<span className='md:pl-2'>
											<li className='text-xs md:text-base h-full items-center flex'>
												Ticker
											</li>
										</span>

										<span className=''>
											<li className='text-xs md:text-base h-full items-center flex'>
												Current Price
											</li>
										</span>

										<span className=''>
											<li className='text-xs md:text-base h-full items-center flex'>
												24hr Change
											</li>
										</span>
									</ul>
								</nav>

								<div className='flex flex-col h-max bg-opacity-20 mt-4 rounded-lg'>
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
						<header className='flex items-end md:items-center justify-center h-16  p-2 md:p-0 text-xl'>
							Watchlist
						</header>
						<article className='flex flex-col  h-72 md:h-96 mb-36  m-2 md:m-0 md:p-0 bg-primary text-white rounded-xl '>
							{<CustomWatchlist></CustomWatchlist>}
						</article>
					</section>
				</div>
				<section className='relative h-full flex flex-col my-12 w-full rounded-lg px-2 py-4  text-white'>
					<div className='text-xl mb-4'>Today's Top Gainers</div>
					<div className='flex flex-col h-96 overflow-auto w-max md:w-full'>
						<ul className='sticky top-0 h-12 grid grid-cols-5 mb-2 px-2 py-4 list-none items-center bg-grey2 rounded-lg z-50 '>
							<li className=''>Name</li>
							<li className=''>Ticker</li>
							<li className=''>% Change</li>
							<li className=''>Price</li>
							<li className=''>Change</li>
						</ul>
						<TopGainers />
					</div>
				</section>
			</div>
		</div>
	)
}
