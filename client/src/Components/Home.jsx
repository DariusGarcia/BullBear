import React, { useState } from 'react'
import FetchStocks from './FetchStocks'

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
		<>
			<div className='flex justify-evenly h-auto overflow-x-scroll md:overflow-x-auto md:w-screen items-center mt-12 md:mt-0  bg-grey '>
				<div className='flex flex-col md:flex-row md:justify-evenly w-screen lg:mx-12'>
					{/*----------------------- nav-bar section ----------------------- */}
					<section className='flex flex-col h-screen md:h-1/2 md:w-full md:mr-4 md:mb-1'>
						<form
							className='flex flex-col md:flex-row md:items-end md:mb-3 pl-4 md:pl-0 md:gap-8 justify-start md:justify-between w-full h-max md:h-24 px-1 md:px-0'
							onSubmit={handleSubmit}>
							<h2 className=' mb-4 md:mb-0 md:text-2xl'>Stock Market</h2>
							<h3 className=' mb-4 md:mb-0 md:text-xl text-sm text-black'>
								S&P500 index
							</h3>
							<input
								className='h-10 w-max md:w-47 rounded-md pl-2 mb-4 md:mb-0 text-black active:outline-2 bg-gainsboro bg-opacity-20 placeholder-grey outline-secondary'
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
							<button className='w-3/5 md:w-auto md:h-12 text-sm p-4 flex text-center justify-center bg-secondary text-grey hover:text-white rounded-md mb-6 md:mb-0'>
								Search Ticker
							</button>
						</form>
						{/*----------------------- ticker info ----------------------- */}
						<div className='relative md:h-96 overflow-scroll md:overflow-hidden w-max md:w-full bg-secondary shadow-3xl rounded-xl '>
							<article className='h-96 md:h-96 w-full md:w-full pb-2 py-4 px-0 md:px-4 md:p-4 bg-secondary rounded-xl shadow-3xl overflow-auto'>
								<nav className=' h-12 bg-grey rounded-xl w-full md:w-full mx-3 md:mx-0 md:px-0 '>
									<ul className='grid grid-cols-8 self-center  h-full md:px-0 px-2 '>
										<span className=' md:pl-2'>
											<li className='text-xs md:text-base w-1/7 h-full font-semibold items-center flex'>
												Stock
											</li>
										</span>
										<span className=''>
											<li className='text-xs md:text-base w-1/7 h-full font-semibold items-center flex'>
												Name
											</li>
										</span>
										<span className=''>
											<li className='text-xs md:text-base w-1/7 h-full font-semibold items-center flex'>
												Current Price
											</li>
										</span>
										<span className=' '>
											<li className='text-xs md:text-base w-1/7 h-full font-semibold items-center flex'>
												Open
											</li>
										</span>
										<span className=''>
											<li className='text-xs md:text-base w-1/7 h-full font-semibold items-center flex'>
												Today's High
											</li>
										</span>
										<span className=''>
											<li className='text-xs md:text-base w-1/7 h-full font-semibold items-center flex'>
												24hr Change
											</li>
										</span>
										<span className=''>
											<li className='text-xs md:text-base w-1/7 h-full font-semibold items-center flex'>
												Volume
											</li>
										</span>
									</ul>
								</nav>
								<div className='overflow-auto md:overflow-hidden'>
									{ticker.map((enteredTicker) => (
										<FetchStocks
											name={enteredTicker}
											key={enteredTicker}></FetchStocks>
									))}
								</div>
							</article>
						</div>
					</section>
					{/*----------------------- Stocks watchlist section ----------------------- */}
					<section className='h-3/5 w-full md:w-72 flex flex-col mt-24 md:mt-0 '>
						<header className='flex items-end md:items-end  md:mb-3 h-24 p-2 md:p-0 text-xl'>
							Stocks
						</header>
						<article className='h-96 w-full md:w-full m-2 md:m-0 md:p-0 bg-secondary shadow-3xl rounded-xl '></article>
					</section>
				</div>
			</div>
		</>
	)
}
