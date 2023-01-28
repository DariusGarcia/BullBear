import { useState, useEffect } from 'react'
/**
 * This functional component displays the index % change performance
 * @param {object} index The index array object
 * @returns {JSX.Element} - The JSX that the component will render
 */
export default function IndexPerformances() {
  const [indexes, setIndexes] = useState([])
  const indexList = [
    '^GSPC',
    '^IXIC',
    '^DWCF',
    '^RUATR',
    '^NDX',
    '^TYX',
    '^TNX',
    '^FVX',
    '^VIX',
  ]

  useEffect(() => {
    document.title = 'BullBear - Market Performance'
    const fetchIndexes = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_INDEX_URL}${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => setIndexes(data))
        .catch((err) => console.log(err))

      return response
    }
    fetchIndexes()
  }, [])

  // find the index value of the fetched API data that matches the specified stock market index symbol
  const indexValue = indexList?.map((index) =>
    indexes.findIndex((x) => x.symbol === index)
  )

  const listOfIndexes = indexValue?.map((key) => (
    <ul className='list-none '>
      <li className='flex md:w-full justify-center w-max text-xs md:text-base '>
        {indexes[key]?.name}
      </li>
      <li className='flex md:justify-center'>
        {indexes[key]?.price?.toFixed(2)}
      </li>
      <li
        className={
          indexes[key]?.change >= 0
            ? 'flex md:justify-center text-green'
            : 'flex md:justify-center text-red'
        }
      >
        {indexes[key]?.changesPercentage?.toFixed(2)}%
      </li>
    </ul>
  ))

  return (
    <>
      {indexes && (
        <section className='grid grid-cols-3 gap-4 list-none w-full '>
          {listOfIndexes?.map((indexDetails) => (
            <article className='bg-grey rounded-md p-2 w-full overflow-x-auto md:overflow-hidden hover:border-[1px] hover:border-lightBlue border-[1px] border-primary '>
              {indexDetails}
            </article>
          ))}
        </section>
      )}
    </>
  )
}
