import { useState } from 'react'

export default function StockAboutInfo({ companyDetails }) {
  const [toggle, setToggle] = useState(false)
  return (
    companyDetails && (
      <>
        <span className='flex flex-row justify-between'>
          <h3 className='text-xl border-b-2 border-lightBlue mb-4'>
            About {companyDetails[0]['companyName']}
          </h3>
        </span>
        {!toggle ? (
          <p className=''>
            {companyDetails[0]['description'].substring(0, 350).concat('...')}
          </p>
        ) : (
          <p className=''>{companyDetails[0]['description']}</p>
        )}
        <button
          className='border-b-2 border-lightBlue text-lightBlue text-sm mt-2 pb-1 hover:opacity-70 ease-in transition duration-75 '
          onClick={() => setToggle(!toggle)}
        >
          {!toggle ? 'Show more' : 'Show less'}
        </button>
      </>
    )
  )
}
