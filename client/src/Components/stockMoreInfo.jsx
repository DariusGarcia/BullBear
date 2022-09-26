import { useState } from 'react'

export const StockMoreInfo = (props) => {
	const {
		stockData,
		companyDetails,
		companyProfile,
		ticker,
		stockPeers,
		stockRatings,
	} = props
	const [toggle, setToggle] = useState(false)

	// function to find the index of the stock that is being searched and fetched from API.
	// index used for companyProfile to find the sector, subsector, and founded.
	function findId(ticker) {
		const ID = companyProfile.map((el) => el.symbol).indexOf(ticker)

		return ID
	}

	return (
		<>
			{findId &&
				companyDetails &&
				companyDetails.length > 0 &&
				stockPeers &&
				stockRatings && (
					<div className='px-4 text-white w-full overflow-hidden'>
						<section className='grid grid-cols-2 mb-4 md:mb-8 gap-y-4'>
							<article className=''>
								<p className='opacity-70'>CEO</p>

								<p className=''>{companyDetails[0].ceo}</p>
							</article>
							<article className=''>
								<p className='opacity-70'>Employees</p>
								<p className=''>
									{companyDetails[0].fullTimeEmployees.toLocaleString()}
								</p>
							</article>
							<article className=''>
								<p className='opacity-70'>Founded</p>
								<p className=''>{companyProfile[0].founded}</p>
							</article>
							<article className=''>
								<p className='opacity-70'>Headquarters</p>
								<p className=''>{companyProfile[0].headQuarter}</p>
							</article>
							<article className=''>
								<p className='opacity-70'>Industry</p>
								<p className=''>
									{companyProfile[findId(ticker)]?.sector ||
										companyDetails[0]['sector']}
								</p>
							</article>{' '}
							<article className=''>
								<p className='opacity-70'>Sector</p>
								<p className=''>
									{companyProfile[findId(ticker)]?.subSector || '-'}{' '}
								</p>
							</article>
						</section>
						<h4 className='text-xl mb-2'>Stats</h4>
						<div className='grid grid-cols-2 overflow-x-auto'>
							<div className='flex flex-row gap-x-2 md:gap-x-4'>
								<ul className='flex flex-col text-white  md:text-base opacity-70'>
									<li className='h-full  items-center flex '>Open</li>
									<li className=' h-full  items-center flex '>High</li>
									<li className=' h-full  items-center flex '>Low</li>
									<li className=' h-full  items-center flex '>52 Wk high</li>
									<li className=' h-full  items-center flex '>52 Wk low</li>
								</ul>
								<ul className='flex flex-col w-max h-full  items-start justify-center text-white px-2'>
									<li className='h-full items-center flex '>
										${stockData[0].open.toFixed(2)}
									</li>
									<li className=' h-full items-center flex '>
										${stockData[0].dayHigh.toFixed(2)}
									</li>
									<li className=' h-full items-center flex '>
										${stockData[0].dayLow.toFixed(2)}
									</li>
									<li className='h-full items-center md:flex '>
										${stockData[0].yearHigh.toFixed(2)}
									</li>
									<li className='h-full items-center md:flex '>
										${stockData[0].yearLow.toFixed(2)}
									</li>
								</ul>
							</div>
							<div className='flex flex-row gap-x-2 md:gap-x-4'>
								<ul className='flex flex-col text-white  md:text-base opacity-70'>
									<li className='h-full  items-center flex '>Volume</li>
									<li className='h-full  w-max items-center flex text-sm md:text-base'>
										Avg volume
									</li>
									<li className='h-full  w-max items-center flex '>
										P/E ratio
									</li>
									<li className='h-full  items-center flex '>Mkt cap</li>
									<li className='h-full  items-center flex text-xs md:text-base '>
										Date added
									</li>
								</ul>
								<ul className='flex flex-col w-max h-full items-start justify-center text-white px-2'>
									<li className=' h-full items-center flex '>
										{stockData[0].volume.toLocaleString()}
									</li>
									<li className='h-full items-center flex '>
										{stockData[0].avgVolume.toLocaleString()}
									</li>
									<li className=' h-full items-center flex '>
										{Number(stockData[0]['pe']).toFixed(2)}
									</li>
									<li className='flex h-full items-center text-base'>
										${companyDetails[0]['mktCap']?.toLocaleString()}
									</li>
									<li className='flex flex-wrap h-full  w-max items-center text-sm md:text-base'>
										{companyProfile[findId(ticker)]?.dateFirstAdded || '-'}
									</li>
								</ul>
							</div>
						</div>
						{/* Displays similar stocks */}
						<div className='my-8 flex flex-col items-start md:w-full overflow-auto '>
							<h4 className='text-xl mb-2 '>Similar Stocks</h4>
							<ul className='grid grid-cols-4 md:flex md:flex-row gap-4 w-full overflow-auto md:w-full text-white md:text-base justify-center items-center'>
								{stockPeers[0].peersList.map((stock) => (
									<li
										key={stock.symbol}
										className='flex md:w-full bg-primary p-4 rounded-md justify-center items-center text-white  border-2 border-primary hover:border-2 hover:border-lightBlue transition ease-in-out delay-45'>
										${stock}
									</li>
								))}
							</ul>
						</div>
						{/* Displays stock ratings */}
						<div className='my-8 flex flex-col  items-start  '>
							<h4 className='text-xl mb-2 '>Analyst Ratings</h4>
							<ul className='flex flex-col w-full md:w-max gap-4 text-white md:text-base  bg-primary p-4 rounded-lg'>
								<li key='stockRating' className='rounded-md '>
									<span className='opacity-70'>Recommendation:</span>{' '}
									{stockRatings[0]?.ratingRecommendation}
								</li>
								<li key='stockRating' className='rounded-md '>
									<span className='opacity-70'>Rating score:</span>{' '}
									{stockRatings[0]?.ratingScore}
								</li>
								<li key='stockRating' className='flex '>
									{stockRatings[0]?.date}
								</li>
							</ul>
						</div>
						{/* About the stock section*/}
						<div className='mt-8'>
							<span className='flex flex-row justify-between'>
								<h3 className='text-xl border-b-2 border-lightBlue mb-4'>
									About {companyDetails[0]['companyName']}
								</h3>
							</span>
							{!toggle ? (
								<p className=''>
									{companyDetails[0]['description']
										.substring(0, 170)
										.concat('...')}
								</p>
							) : (
								<p className=''>{companyDetails[0]['description']}</p>
							)}
							<button
								className='border-b-2 border-lightBlue text-lightBlue text-sm mt-2 pb-1 '
								onClick={() => setToggle(!toggle)}>
								{!toggle ? 'Show more' : 'Show less'}
							</button>
						</div>
					</div>
				)}
		</>
	)
}
