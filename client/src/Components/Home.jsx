import { useState } from 'react'
import { Watchlist } from './watchlist'
import { TopGainers } from './topGainers'
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi'
import { BsGlobe } from 'react-icons/bs'
import FetchSingleStock from './fetchSingleStock'

import { TopLosers } from './topLosers'

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
		<div className='flex flex-col w-full h-full mt-4 md:mt-12 items-center justify-evenly overflow-x-scroll md:overflow-x-auto bg-grey'>
			<div className='flex flex-col w-full md:w-3/5 px-2 md:px-0 md:mx-12 md:justify-evenly '>
				<header className='flex mb-4 md:mb-8 md:gap-2 h-full flex-col items-center text-white  '>
					<h2 className='flex flex-row items-center gap-2 md:mb-0 text-2xl md:text-4xl '>
						Stock Screener <BsGlobe size={25} />
					</h2>
					<h3 className='mb-4 md:mb-0 md:text-xl text-sm opacity-50 '>
						S&P500 index
					</h3>
				</header>
				<div className='flex flex-col w-full md:flex-row md:px-0 md:justify-evenly  '>
					<section className='flex flex-col md:h-full md:w-full s '>
						{/*----------------------- nav-bar section ----------------------- */}
						<form
							className='flex flex-col md:flex-row w-full h-max md:h-16 text-white items-start md:mb-3 md:pl-0 md:gap-8 md:justify-start px-1 md:px-0'
							onSubmit={handleSubmit}>
							<input
								className='h-12 w-full md:w-96 bg-primary pl-2 mb-4 hover:border-white focus:bg-white md:mb-0 active:outline-2 bg-opacity-20 placeholder-gainsboro text-black outline-lightBlue rounded-md'
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
							<button className='w-2/5 max-w-[216px] md:w-auto md:h-12 text-sm p-4 flex text-center justify-center items-center hover:scale-105 transition ease-in-out delay-25 bg-lightBlue bg-opacity-20 border-2 hover:bg-opacity-100 border-lightBlue text-white hover:text-white rounded-lg mb-6 md:mb-0'>
								Search Stock
							</button>
						</form>
						{/*----------------------- ticker info ----------------------- */}
						<div className='relative h-full overflow-auto bg-opacity-20 md:overflow-hidden w-full  rounded-lg '>
							<article className='h-max w-full px-0 rounded-lg overflow-auto'>
								<nav className='sticky top-0 w-full h-12 bg-grey2 text-white z-20 rounded-lg '>
									<ul className='grid grid-cols-4 w-full h-full self-center md:px-0 px-2 opacity-70'>
										<span className='md:pl-2'>
											<li className='h-full items-center flex ml-2  md:text-base'>
												Stock
											</li>
										</span>

										<span className=''>
											<li className='h-full items-center flex  md:text-base'>
												Price
											</li>
										</span>
										{ticker <= 0 ? (
											<span className=''>
												<li className='h-full items-center justify-end flex  md:text-base'>
													Change
												</li>
											</span>
										) : (
											<span className=''>
												<li className='h-full items-center flex md:text-base'>
													Change
												</li>
											</span>
										)}
									</ul>
								</nav>
								{!ticker ? (
									<div className='flex flex-col bg-red h-max mt-4 bg-opacity-20 rounded-lg'>
										Search
									</div>
								) : (
									<div className='flex h-max mt-4 bg-opacity-20 rounded-lg flex-col-reverse'>
										{ticker.map((enteredTicker) => (
											<div className='overflow-auto flex md:w-full  mb-4 text-sm md:text-base shadow-lg bg-primary md:mx-0 rounded-lg'>
												<FetchSingleStock
													name={enteredTicker}
													key={enteredTicker}
												/>
											</div>
										))}
									</div>
								)}
							</article>
						</div>
					</section>
					{/*----------------------- Stocks watchlist section ----------------------- */}
					<section className='flex flex-col h-max w-full justify-center md:w-96 min-w-[315px] md:mt-0 md:ml-4 text-white '>
						<h3 className='flex h-16 justify-start p-2 md:p-0 gap-2 items-center md:items-end text-xl'>
							{/* Watchlist <IoMdListBox size={25} /> */}
						</h3>
						<article className='flex flex-col h-72 md:h-96 mb-16 md:mb-36 md:p-0  text-white rounded-xl '>
							{<Watchlist stockBatch={stockBatch}></Watchlist>}
						</article>
					</section>
				</div>
			</div>
			<section className='grid md:grid-cols-2 md:w-3/5 my-24 gap-8 md:gap-0'>
				{/* Display today's top GAINERS in the market */}
				<article className='relative h-full flex flex-col  rounded-lg px-2 py-4 w-full  text-white'>
					<div className='text-lg md:text-xl mb-4 flex flex-row gap-2 items-center'>
						Top Gainers <BiTrendingUp color='green' size={25} />
					</div>
					<div className='flex flex-col h-96 overflow-auto '>
						<ul className='sticky top-0 h-12  grid grid-cols-2 mb-2 px-2 py-4 items-center content-center bg-grey2 rounded-lg z-20 list-none'>
							<li className=''>Stock</li>
							<li className=''>Price</li>
						</ul>
						<TopGainers />
					</div>
				</article>

				{/* Display today's top LOSERS in the market */}
				<article className='relative h-full flex flex-col rounded-lg px-2 py-4 w-full  text-white'>
					<div className='text-lg md:text-xl mb-4 flex flex-row gap-2 items-center'>
						Top Losers <BiTrendingDown color='red' size={25} />
					</div>
					<div className='flex flex-col h-96 overflow-auto '>
						<ul className='sticky top-0 h-12 grid grid-cols-2 mb-2 px-2 py-4 items-center content-center bg-grey2 rounded-lg z-20 list-none'>
							<li className=''>Stock</li>
							<li className=''>Price</li>
						</ul>
						<TopLosers />
					</div>
				</article>
			</section>
		</div>
	)
}
