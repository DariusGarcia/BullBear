import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { UseFetchChartData } from '../Hooks/useFetchChartData'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Daily Chart',
    },
  },
}

const data = {
  labels: ['', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'Stock Price',
      data: [
        134.76, 133.41, 133.49, 130.73, 130.15, 129.62, 125.02, 126.36, 125.07,
      ],
      backgroundColor: ['rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)'],
      borderWidth: 1,
    },
  ],
}

const StockLineChart = ({ stock }) => {
  const [prices, setPrices] = useState()

  function displayMonthlyDates(times) {
    const monthlyArr = []
    for (let i = 0; i < times.length; i += 3) {
      monthlyArr.push(times[i])
    }
    console.log(`monthly array: ${monthlyArr[0].date}`)
    return monthlyArr
  }

  useEffect(() => {
    async function fetchData() {
      await UseFetchChartData(stock).then((data) => setPrices(data))
    }
    setPrices(fetchData)
    displayMonthlyDates(prices['historical'])
  }, [stock])

  return (
    <section className=''>
      <Line options={options} data={data} />
    </section>
  )
}

export default StockLineChart
