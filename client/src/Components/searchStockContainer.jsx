import { VscGraphLine } from 'react-icons/vsc'
import FetchSingleStock from './fetchSingleStock'

export default function SearchStockContainer(props) {
	const { ticker } = props

	return (
		<div
			key='stock-container'
			className='flex flex-col w-full  px-2 md:px-0  md:justify-evenly'>
			<div className='flex flex-col w-full md:flex-row md:px-0 md:justify-evenly  '>
				<section className='flex flex-col md:h-full md:w-full mt-4 '>
					<header className='flex mb-4 md:mb-8 gap-8 h-max flex-row items-center text-white  '>
						<h2 className='flex flex-row items-center gap-4 md:mb-0 text-2xl md:text-4xl '>
							Stock Screener
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
										<li
											key='stockLabel'
											className='h-full items-center flex ml-2  md:text-base'>
											Stock
										</li>
									</span>

									<span className='priceLabel'>
										<li
											key=''
											className='h-full items-center flex  md:text-base'>
											Price
										</li>
									</span>
									{ticker <= 0 ? (
										<span className=''>
											<li
												key='changeLabel'
												className='h-full items-center justify-end flex  md:text-base'>
												Change
											</li>
										</span>
									) : (
										<span className=''>
											<li
												key='changeLabel'
												className='h-full items-center flex md:text-base'>
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
									{ticker.map((searchedTicker) => (
										<div className='overflow-auto flex md:w-full  mb-4 text-sm md:text-base shadow-lg bg-grey md:mx-0 rounded-lg'>
											<FetchSingleStock
												name={searchedTicker}
												key={searchedTicker}
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
