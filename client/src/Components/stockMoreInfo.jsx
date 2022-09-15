import { useState, useEffect } from 'react'
import { FetchCompanyProfile } from '../utils/fetchCompanyProfile'

export const StockMoreInfo = (props) => {
	const { ticker, openPrice, high, volume } = props
	const [companyDetails, setCompanyDetails] = useState([])

	useEffect(() => {
		FetchCompanyProfile(ticker)
			.then((data) => setCompanyDetails(data))
			.catch((err) => console.log(err))
	}, [ticker])

	return (
		<>
			{companyDetails && companyDetails.length > 0 && (
				<div className='grid grid-cols-5'>
					<ul className='flex flex-col text-white pl-2 md:text-base opacity-70'>
						<li className=' h-full items-center flex '>Sector</li>
						<li className=' h-full items-center flex '>Market Cap</li>

						<li className='h-full items-center flex '>Opening</li>
						<li className=' h-full items-center flex '>High</li>
						<li className=' h-full items-center flex '>Volume</li>
						{/* <li className=' h-full items-center flex '>Description</li> */}
					</ul>
					<ul className='flex flex-col w-max h-full  items-start justify-center text-white px-2'>
						<li className='h-full items-center md:flex '>
							{companyDetails[0]['sector']}
						</li>
						<li className='h-full items-center flex '>
							${companyDetails[0]['mktCap']?.toLocaleString()}
						</li>
						<li className='h-full items-center flex '>
							${openPrice?.toFixed(2)}
						</li>
						<li className=' h-full items-center flex '>${high?.toFixed(2)}</li>
						<li className=' h-full items-center flex '>{volume}</li>
						{/* <li className=' h-full flex-wrap items-center md:flex '>
						{companyDetails[0]['description']}
					</li> */}
					</ul>
				</div>
			)}
		</>
	)
}
