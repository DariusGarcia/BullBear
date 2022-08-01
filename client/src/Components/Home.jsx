import React, { useState } from 'react'
import FetchStocks from './FetchStocks'
import Navigation from './Navigation'

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
		console.log(ticker)
	}

	return (
		<>
			<div className='flex justify-evenly h-auto overflow-x-scroll md:overflow-x-auto md:w-screen items-center mt-12 md:mt-48 md:mt-0 pb-48 bg-primary text-white'>
				<div className='flex flex-col md:flex-row md:justify-evenly w-screen'>
					{/*----------------------- nav-bar section ----------------------- */}
					<section className='flex flex-col h-screen md:h-1/2 md:w-full md:mx-4 md:mb-1'>
						<form
							className='flex flex-col md:flex-row md:items-end md:mb-3 pl-4 md:pl-0 md:gap-8 justify-start md:justify-between w-full h-max md:h-24 px-1 md:px-0'
							onSubmit={handleSubmit}>
							<h2 className=' mb-4 md:mb-0 md:text-2xl'>Stock Market</h2>
							<h3 className=' mb-4 md:mb-0 md:text-xl text-sm text-white'>
								S&P500 index
							</h3>
							<input
								className='h-10 w-max md:w-47 rounded-md pl-2 mb-4 md:mb-0 active:outline-2 bg-grey active:bg-white active:text-black hover:bg-white hover:placeholder-grey hover:text-black placeholder-white  outline-lightBlue'
								value={value}
								onChange={handleChange}
								onInput={(e) =>
									(e.target.value = ('' + e.target.value).toUpperCase())
								}
								type='text'
								placeholder='e.g. MSFT'
								autoFocus
							/>
							<button className='w-3/5 md:w-auto md:h-12 text-sm p-4 flex text-center justify-center bg-lightBlue rounded-md mb-6 md:mb-0'>
								Search Ticker
							</button>
						</form>
						{/*----------------------- ticker info ----------------------- */}
						<div className='relative h-screen md:h-96 overflow-scroll md:overflow-hidden w-max md:w-full bg-secondary shadow-3xl rounded-xl '>
							<article className='h-96 md:h-96 w-max md:w-full pb-2 py-4 px-0 md:px-4 md:p-4 bg-secondary rounded-xl shadow-3xl overflow-auto'>
								<nav className='flex items-center h-12 bg-grey rounded-xl w-max md:w-full mx-3 md:mx-0 md:px-0 '>
									<ul className='flex md:w-full w-max justify-between md:px-0 px-2 '>
										<span className='w-24 md:w-1/6 md:pl-2'>
											<li className='text-xs md:text-base w-max border-b-2 pb-1'>
												Stock
											</li>
										</span>
										<span className='w-24 md:w-1/6 mr-4 md:mr-0'>
											<li className='text-xs md:text-base w-max border-b-2 pb-1'>
												Current Price
											</li>
										</span>
										<span className='w-24 md:w-1/6 '>
											<li className='text-xs md:text-base w-max border-b-2 pb-1'>
												Open
											</li>
										</span>
										<span className='w-24 md:w-1/6'>
											<li className='text-xs md:text-base  w-max border-b-2 pb-1'>
												Previous Close
											</li>
										</span>
										<span className='w-24 md:w-1/6 mx-4 md:mx-0'>
											<li className='text-xs md:text-base w-max border-b-2 pb-1'>
												24hr Change
											</li>
										</span>
										<span className='w-24 md:w-1/6'>
											<li className='text-xs md:text-base w-max border-b-2 mr-2 md:mr-0 pb-1'>
												Volume
											</li>
										</span>
										<span className='w-24 md:w-1/6'>
											<li className='text-xs md:text-base w-max border-b-2 pb-1 ml-2 md:ml-0'>
												Last Open
											</li>
										</span>
									</ul>
								</nav>
								<div className='overflow-auto md:overflow-hidden'>
									{ticker.map((favTicker) => (
										<FetchStocks name={favTicker} key={favTicker}></FetchStocks>
									))}
								</div>
							</article>
						</div>
					</section>
					{/*----------------------- Stocks watchlist section ----------------------- */}
					{/* <section className='h-3/5 w-full md:w-72 flex flex-col mt-24 md:mt-0 '>
						<header className='flex items-end md:items-end  md:mb-3 h-24 p-2 md:p-0 text-xl'>
							Stocks
						</header>
						<article className='h-96 w-full md:w-full m-2 md:m-0 md:p-0 bg-secondary shadow-3xl rounded-xl '></article>
					</section> */}
				</div>
			</div>
		</>
	)
}
