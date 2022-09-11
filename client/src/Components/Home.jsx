import { useState } from 'react'
import { CustomWatchlist } from './customWatchlist'
import SingleStockContainer from './singleStockContainer'

export default function Home() {
	const [value, setValue] = useState('')
	const [ticker, setTicker] = useState([])
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
		<div className='flex justify-evenly w-full md:h-screen overflow-x-scroll md:overflow-x-auto items-center mt-12 md:mt-0 bg-grey '>
			<div className='flex flex-col md:flex-row md:justify-evenly lg:mx-12'>
				{/*----------------------- nav-bar section ----------------------- */}
				<section className='flex flex-col md:h-1/2 md:w-full md:mr-4 md:mb-1'>
					<form
						className='flex flex-col md:flex-row w-full h-max md:h-24 text-white md:items-end md:mb-3 pl-4 md:pl-0 md:gap-8 justify-start md:justify-between px-1 md:px-0'
						onSubmit={handleSubmit}>
						<h2 className=' mb-4 md:mb-0 md:text-2xl'>Stock Market</h2>
						<h3 className=' mb-4 md:mb-0 md:text-xl text-sm'>S&P500 index</h3>
						<input
							className='h-12 w-max md:w-47 rounded-md pl-2 mb-4 md:mb-0 active:outline-2 bg-opacity-20 placeholder-black text-black outline-secondary'
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
						<button className='w-3/5 md:w-auto md:h-12 text-sm p-4 flex text-center justify-center items-center bg-grey2 text-white hover:text-white rounded-md mb-6 md:mb-0'>
							Search Ticker
						</button>
					</form>
					{/*----------------------- ticker info ----------------------- */}
					<div className='relative overflow-scroll md:overflow-hidden w-max md:w-full rounded-xl '>
						<article className='  w-full md:w-full pb-2 py-4 px-0 rounded-xl shadow-3xl overflow-auto '>
							<nav className=' sticky top-0 bg-grey2 text-white z-50 h-12 rounded-xl w-full md:w-full mx-3 md:mx-0 md:px-0 '>
								<ul className='grid grid-cols-5 self-center h-full md:px-0 px-2 '>
									<span className='px-2'>
										<li className='hidden md:flex text-xs md:text-base w-1/7 h-full items-center '>
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

							{ticker < 4 ? (
								<div className='flex md:w-full mt-4 text-sm md:text-base bg-primary mx-3 md:mx-0 rounded-xl text-primary h-80'>
									...
								</div>
							) : (
								<div className='overflow-auto md:overflow-hidden'>
									{ticker.map((enteredTicker) => (
										<SingleStockContainer
											name={enteredTicker}
											key={enteredTicker}></SingleStockContainer>
									))}
								</div>
							)}
						</article>
					</div>
				</section>
				{/*----------------------- Stocks watchlist section ----------------------- */}
				<section className='h-3/5 w-full md:w-96 flex flex-col mt-24 md:mt-0 text-white '>
					<header className='flex items-end md:items-end justify-center md:mb-7 h-24 p-2 md:p-0 text-xl'>
						Stocks
					</header>
					<article className='flex flex-col h-96 overflow-auto w-full md:w-full m-2 md:m-0 md:p-0 bg-primary text-white rounded-xl '>
						{<CustomWatchlist refresh={refresh}></CustomWatchlist>}
					</article>
				</section>
			</div>
		</div>
	)
}
