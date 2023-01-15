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

const StockLineChart = ({ stock }) => {
  const [prices, setPrices] = useState({})
  const [times, setTimes] = useState([])

  useEffect(() => {
    const handleGetTimeData = async () => {
      setPrices(await UseFetchChartData(stock))
    }
    handleGetTimeData()
    console.log(prices)
    setTimes(displayMonthlyDates(prices))
  }, [stock])

  //   if (prices) {
  //     console.log(
  //       'times: ',
  //       prices.historical.map((data) => data.close.toString())
  //     )
  //   }

  if (prices.length > 0) {
    var timeSlotdata = prices?.map(
      (val, index, array) => array[array.length - 1 - index]
    )
  }

  const dataChart = {
    labels: timeSlotdata?.map((data) => data?.date),
    datasets: [
      {
        label: 'Stock Price',
        data: timeSlotdata?.map((data) => data?.close?.toString()),
        // data: ['100'],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  }

  return (
    <section className=''>
      <Line options={options} data={dataChart} />
    </section>
  )
}

function displayMonthlyDates(times) {
  const monthlyArr = []
  for (let i = 0; i < times?.historical?.length; i += 21) {
    monthlyArr.push(times?.historical[i])
  }
  console.log(`monthly array: ${monthlyArr}`)
  return monthlyArr
}

function setTimeData(timeData) {
  return timeData.map((data) => console.log('time: ', data))
}

export default StockLineChart
