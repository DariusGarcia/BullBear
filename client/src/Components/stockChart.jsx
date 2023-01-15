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

  if (prices.length > 0) {
    var timeSlotdata = prices?.map(
      (val, index, array) => array[array.length - 1 - index]
    )
  }

  function formatTime(date) {
    date.map(() => {
      let newDate = new Date(date.date)

      let options = { hour: '2-digit', minute: '2-digit', hour12: true }
      return newDate
        .toLocaleTimeString('en-US', options)
        .setHours(date.getHours() - 3)
    })
  }
  const dataChart = {
    // labels: timeSlotdata?.map((data) => {
    //   let newDate = new Date(data.date)
    //   let options = { month: 'short', day: 'numeric' }
    //   return newDate.toLocaleDateString('en-US', options)
    // }),
    labels: timeSlotdata?.map((data) => {
      let newDate = new Date(data.date)

      let options = { hour: '2-digit', minute: '2-digit', hour12: true }
      return newDate.toLocaleTimeString('en-US', options)
    }),

    datasets: [
      {
        label: 'Stock Price',
        data: timeSlotdata?.map((data) => data?.close?.toString()),
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
