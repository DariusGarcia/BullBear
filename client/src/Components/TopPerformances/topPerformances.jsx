import React, { useState, useEffect } from 'react'
import {
  UseFetchMarketPerformances,
  UseFetchTopGainers,
} from '../../Hooks/useFetchMarketPerformances'
import PerformanceTableDisplay from './performanceTableDisplay'
const json = require('../../../public/tableData.json')
/**
 *
 * TODO: Incorporate MUI data table and
 *
 *
 */

export default function TopPerformances({ query }) {
  const [performance, setPerformance] = useState({})

  useEffect(() => {
    async function fetchJSONData(json) {
      await fetch(json)
        .then((data) => data.json)
        .then((res) => setPerformance(res))
        .catch((err) => console.log('Error fetching from JSON file: ' + err))
    }
    fetchJSONData(json)
  }, [])

  //   UseFetchMarketPerformances(query)
  //     .then((performanceData) => setPerformance(performanceData))
  //     .catch((error) => console.log(error))
  // }, [])

  return (
    <>
      <h2 className='mb-2 text-lg text-white'>Top {query}</h2>
      {performance && <PerformanceTableDisplay performance={json} />}
    </>
  )
}
