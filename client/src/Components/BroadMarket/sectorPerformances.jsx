import { useState, useEffect } from 'react'
import { FetchSectorPerformance } from '../../utils/fetchSectorPerformance'

export default function SectorPerformances() {
  const [sectors, setSectors] = useState([])

  useEffect(() => {
    const fetchSectors = async () => {
      const response = FetchSectorPerformance()
        .then((data) => setSectors(data))
        .catch((err) => console.log(err))

      return response
    }
    fetchSectors()
  }, [])

  const listOfSectors = sectors?.map((sectorData) => (
    <ul className='list-none '>
      <li
        key={sectorData.sector}
        className='flex justify-center w-max md:w-full text-xs md:text-base '
      >
        {sectorData?.sector}
      </li>
      <li
        key={`${sectorData.sector} percentage`}
        className={
          sectorData?.changesPercentage.includes('-')
            ? 'md:flex justify-center text-red'
            : 'md:flex justify-center text-green'
        }
      >
        {sectorData?.changesPercentage.substring(0, 4)}%
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
              className='flex justify-center items-center p-2 h-24 w-full bg-grey rounded-md overflow-x-auto md:overflow-hidden hover:border-[1px] hover:border-lightBlue border-[1px] border-primary '
            >
              {sectorDetails}
            </article>
          ))}
        </section>
      )}
    </>
  )
}
