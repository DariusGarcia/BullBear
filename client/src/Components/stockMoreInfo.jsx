import { useState } from 'react'

export const StockMoreInfo = (props) => {
	const { stockData, companyDetails } = props
	const [toggle, setToggle] = useState(false)

	return (
		<>
			{companyDetails && companyDetails.length > 0 && (
				<div className='px-2 text-white w-full'>
					<section className='grid grid-cols-2 my-4 mb-8 gap-y-4'>
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
							<p className=''>{companyDetails[0].ceo}</p>
						</article>
						<article className=''>
							<p className='opacity-70'>Headquarters</p>
							<p className=''>{companyDetails[0].city}</p>
						</article>
					</section>
					<h4 className='text-xl mb-2'>Stats</h4>
					<div className='grid grid-cols-2'>
						<div className='flex flex-row gap-4'>
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
						<div className='flex flex-row gap-4'>
							<ul className='flex flex-col text-white  md:text-base opacity-70'>
								<li className='h-full  items-center flex '>Volume</li>
								<li className='h-full  items-center flex '>Avg volume</li>
								<li className='h-full  items-center flex '>P/E ratio</li>
								<li className='h-full  items-center flex '>Mkt cap</li>
								<li className='h-full  items-center flex '>Sector</li>
							</ul>
							<ul className='flex flex-col w-max h-full  items-start justify-center text-white px-2'>
								<li className=' h-full items-center flex '>
									{stockData[0].volume.toLocaleString()}
								</li>
								<li className='h-full items-center flex '>
									{stockData[0].avgVolume.toLocaleString()}
								</li>
								<li className=' h-full items-center flex '>
									{Number(stockData[0]['pe']).toFixed(2)}
								</li>
								<li className='h-full  items-center flex '>
									${companyDetails[0]['mktCap']?.toLocaleString()}
								</li>
								<li className='h-full items-center md:flex w-max text-sm flex flex-wrap '>
									{companyDetails[0]['sector']}
								</li>
							</ul>
						</div>
					</div>
					<div className='mt-8'>
						<span className='flex flex-row justify-between'>
							<h3 className='text-xl'>
								About {companyDetails[0]['companyName']}
							</h3>
						</span>
						{!toggle ? (
							<p className=''>
								{companyDetails[0]['description']
									.substring(0, 350)
									.concat('...')}
							</p>
						) : (
							<p className=''>{companyDetails[0]['description']}</p>
						)}
						<button
							className='border-b-2 border-lightBlue text-lightBlue text-sm p-2 '
							onClick={() => setToggle(!toggle)}>
							Show more
						</button>
					</div>
				</div>
			)}
		</>
	)
}
