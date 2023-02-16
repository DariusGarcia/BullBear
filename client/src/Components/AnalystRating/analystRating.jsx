import formatTime from '../../utils/formatTime'
export default function AnalystRating({ stockRatings }) {
  return (
    stockRatings && (
      <article className='flex flex-col  items-start mb-8 md:mb-0 '>
        <h4 className='text-xl mb-2 '>Analyst Ratings</h4>
        <ul className='flex flex-col w-full md:w-max gap-4 text-white md:text-base  bg-primary p-4 rounded-lg'>
          <li
            key='stock recommendation'
            className={
              stockRatings[0]?.ratingScore >= 4
                ? 'rounded-md text-green'
                : 'rounded-md text-red'
            }
          >
            <span className='text-white'>Recommendation:</span>{' '}
            {stockRatings[0]?.ratingRecommendation}
          </li>
          <li
            key='stockRating score'
            className={
              stockRatings[0]?.ratingScore >= 4
                ? 'rounded-md text-green'
                : 'rounded-md text-red'
            }
          >
            <span className='text-white'>Rating score:</span>{' '}
            {stockRatings[0]?.ratingScore}
          </li>
          <li key='stockRating' className='flex '>
            {formatTime(stockRatings[0]?.date)}
          </li>
        </ul>
      </article>
    )
  )
}
