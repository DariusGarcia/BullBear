import { useState } from 'react'
import { Watchlist } from './watchlist'
import { BsGlobe } from 'react-icons/bs'
import FetchSingleStock from './fetchSingleStock'

export default function SearchStockContainer(props) {
	const { ticker } = props
	const [value, setValue] = useState('')

	// const handleChange = (event) => {
	// 	const stock = event.target.value.trim()
	// 	setValue(stock)
	// }

	// const handleSubmit = (event) => {
	// 	event.preventDefault()
	// 	if (!ticker.includes(value)) {
	// 		setTicker(ticker.concat(value))
	// 		setValue('')
	// 	}
	// }

	return (
		<div className='flex flex-col w-full md:w-3/5 px-2 md:px-0  md:justify-evenly'>
			<div className='flex flex-col w-full md:flex-row md:px-0 md:justify-evenly  '>
				<section className='flex flex-col md:h-full md:w-full mt-4 '>
					<header className='flex mb-4 md:mb-8 gap-8 h-max flex-row items-center text-white  '>
						<h2 className='flex flex-row items-center gap-2 md:mb-0 text-2xl md:text-4xl '>
							Stock Screener <BsGlobe size={25} />
						</h2>
						<h3 className='flex md:mb-0 items-center md:text-xl text-sm opacity-50 '>
							S&P500 index
						</h3>
					</header>

					{/*----------------------- ticker info ----------------------- */}
					<div className='relative h-full overflow-auto bg-opacity-20 md:overflow-hidden w-full  rounded-lg '>
						<article className='h-max w-full px-0 rounded-lg overflow-auto'>
							<nav className='sticky top-0 w-full h-12 bg-grey text-white z-20 rounded-lg '>
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
										<div className='overflow-auto flex md:w-full  mb-4 text-sm md:text-base shadow-lg bg-grey md:mx-0 rounded-lg'>
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
			</div>
		</div>
	)
}
