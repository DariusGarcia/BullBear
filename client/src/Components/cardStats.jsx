export default function CardStats(props) {
  const { item } = props
  return (
    <div>
      <h3 className='text-lg font-medium leading-6 text-gray-900'>
        Last 30 days
      </h3>
      <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
        {item.map((item) => (
          <div
            key={item.name}
            className='overflow-hidden rounded-lg bg-primary px-4 py-5 shadow sm:p-6'
          >
            <dt className='truncate text-sm font-medium text-gray-500'>
              {item.sector}
            </dt>
            <dd
              className={
                item?.changesPercentage.includes('-')
                  ? 'md:flex text-2xl justify-start text-red'
                  : 'md:flex text-2xl justify-start text-green'
              }
            >
              {item.changesPercentage.slice(0, 4)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
