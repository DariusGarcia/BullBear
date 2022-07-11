import React, { useState } from 'react';
import FetchStocks from './FetchStocks';

export default function Home() {
	const [value, setValue] = useState('');
	const [ticker, setTicker] = useState([]);

	const handleChange = (event) => {
		const stock = event.target.value.trim();
		setValue(stock);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!ticker.includes(value)) {
			setTicker(ticker.concat(value));
			setValue('');
		}
		console.log(ticker);
	};

	return (
		<div className='flex justify-evenly h-auto w-screen items-center mt-48 md:mt-0 pb-48 bg-primary text-white'>
			<div className='flex flex-col md:flex-row justify-evenly w-screen'>
				<section className='flex flex-col h-1/2 md:w-3/4 md:mb-1'>
					<form
						className='flex flex-col md:flex-row md:items-end md:mb-3 md:gap-8 justify-start md:justify-between w-full h-max md:h-24 px-1 md:px-0'
						onSubmit={handleSubmit}>
						<h2 className=' mb-4  md:mb-0 md:text-2xl'>Stock Market</h2>
						<h3 className=' mb-4 md:mb-0 md:text-xl'>S&P500 index</h3>
						<input
							className='h-10 w-1/4 md:w-47 rounded-md pl-2 mb-4 md:mb-0 active:outline-2 bg-grey placeholder-white  outline-lightBlue'
							value={value}
							onChange={handleChange}
							onInput={(e) =>
								(e.target.value = ('' + e.target.value).toUpperCase())
							}
							type='text'
							placeholder='e.g. MSFT'
							autoFocus
						/>
						<button className='w-32 h-10 text-sm p-2 bg-lightBlue rounded-md mb-12 md:mb-0'>
							Search Ticker
						</button>
					</form>
					<div className='relative md:h-96 overflow-auto w-full bg-secondary shadow-3xl rounded-xl '>
						<article className='md:h-96 md:w-full pb-2 p-4 bg-secondary rounded-xl shadow-3xl'>
							<nav className='flex items-center h-12 bg-grey rounded-xl  '>
								<ul className='flex w-full justify-between px-2 '>
									<span className='w-1/6'>
										<li className='w-max border-b-2 pb-1'>Stock</li>
									</span>
									<span className='w-1/6'>
										<li className='w-max border-b-2 pb-1'>Current Price</li>
									</span>
									<span className='w-1/6'>
										<li className='w-max border-b-2 pb-1'>Open</li>
									</span>
									<span className='w-1/6'>
										<li className='w-max border-b-2 pb-1'>Previous Close</li>
									</span>
									<span className='w-1/6'>
										<li className='w-max border-b-2 pb-1'>24hr Change</li>
									</span>
									<span className='w-1/6'>
										<li className='w-max border-b-2 pb-1'>Volume</li>
									</span>
									<span className='w-1/6'>
										<li className='w-max border-b-2 pb-1'>Last Trading Day</li>
									</span>
								</ul>
							</nav>
							<div className=''>
								{ticker.map((favTicker) => (
									<FetchStocks name={favTicker} key={favTicker}></FetchStocks>
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
	);
}
