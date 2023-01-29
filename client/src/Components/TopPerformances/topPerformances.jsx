import React, { useState, useEffect } from 'react'
import {
  UseFetchMarketPerformances,
  UseFetchTopGainers,
} from '../../Hooks/useFetchMarketPerformances'
import PerformanceTableDisplay from './performanceTableDisplay'
import tableData from './tableData.json'
/**
 *
 * TODO: Incorporate MUI data table and
 *
 *
 */

export default function TopPerformances({ query }) {
  const [performance, setPerformance] = useState({})

  useEffect(() => {
    UseFetchMarketPerformances(query)
      .then((performanceData) => setPerformance(performanceData))
      .catch((error) => console.log(error))
  }, [])

  return (
    <>
      <h2 className='mb-2 text-lg text-green'>Top {query}</h2>
      {performance && <PerformanceTableDisplay performance={tableData} />}
    </>
  )
}
