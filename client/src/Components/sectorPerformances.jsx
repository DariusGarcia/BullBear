import { useState, useEffect } from 'react'
import { FetchSectorPerformance } from '../utils/fetchSectorPerformance'

export default function SectorPerformances() {
	const [sectors, setSectors] = useState([])

	useEffect(() => {
		const fetchSectors = async () => {
			const response = FetchSectorPerformance()
				.then((data) => setSectors(data))
				.then((data) => console.log(data))
				.catch((err) => console.log(err))

			return response
		}
		fetchSectors()
	}, [])

	const listOfSectors = sectors?.map((key) => (
		<ul className='list-none '>
			<li
				key={key.sector}
				className='flex justify-center w-max md:w-full text-xs md:text-base '>
				{key?.sector}
			</li>
			<li
				key={`${key.sector} percentage`}
				className={
					key?.changesPercentage.includes('-')
						? 'md:flex justify-center text-red'
						: 'md:flex justify-center text-green'
				}>
				{key?.changesPercentage.substring(0, 5)}%
			</li>
		</ul>
	))

	return (
		<>
			{sectors && listOfSectors && (
				<section className='grid grid-cols-3 gap-4 list-none w-full '>
					{listOfSectors?.map((sectorDetails) => (
						<article
							key='sector details '
							className='bg-grey rounded-md p-2 w-full overflow-x-auto md:overflow-hidden hover:border-[1px] hover:border-lightBlue border-[1px] border-primary '>
							{sectorDetails}
						</article>
					))}
				</section>
			)}
		</>
	)
}
