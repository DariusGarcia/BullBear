import formatTime from '../../utils/formatTime'

export default function CompanyInfo({
  companyDetails,
  companyProfile,
  ticker,
}) {
  /**
   * function to find the index of the stock that is being searched and fetched from API.
   * index used for companyProfile to find the sector, sub-sector, and founded.
   */
  function findId(ticker) {
    const ID = companyProfile.map((el) => el.symbol).indexOf(ticker)
    return ID
  }

  return (
    companyDetails && (
      <>
        <h2 className='my-2 text-lg'>Company Info</h2>
        <section className='grid grid-cols-2 mb-0 md:mb-4 gap-y-4 bg-primary p-2 rounded-lg'>
          <article className=''>
            <p className='opacity-70'>CEO</p>
            <p className=''>{companyDetails[0]?.ceo}</p>
          </article>
          <article className=''>
            <p className='opacity-70'>Employees</p>
            <p className=''>
              {companyDetails[0]?.fullTimeEmployees.toLocaleString()}
            </p>
          </article>
          <article className=''>
            <p className='opacity-70'>IPO Date</p>
            <p className=''>{formatTime(companyDetails[0]?.ipoDate)}</p>
          </article>
          <article className=''>
            <p className='opacity-70'>Headquarters</p>
            <p className=''>{companyDetails[0]?.city}</p>
          </article>
          <article className=''>
            <p className='opacity-70'>Industry</p>
            <p className=''>
              {companyDetails[0]['industry'] ||
                companyProfile[findId(ticker)]?.sector}
            </p>
          </article>
          <article className=''>
            <p className='opacity-70'>Website</p>
            <a
              href={companyDetails[0]['website'] || '-'}
              className='hover:opacity-70 text-blue hover:underline'
            >
              {companyDetails[0]['website'] || '-'}
            </a>
          </article>
        </section>
      </>
    )
  )
}
