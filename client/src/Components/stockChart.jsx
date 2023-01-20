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
import { UseFetchChartPriceData } from '../Hooks/UseFetchChartPriceData'
import formatTime from '../utils/formatTime'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const StockLineChart = ({ stock }) => {
  const [prices, setPrices] = useState({})
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Daily Chart ${formatTime(prices[0]?.date.slice(0, 11))}`,
      },
    },
  }
  useEffect(() => {
    const handleGetTimeData = async () => {
      setPrices(await UseFetchChartPriceData(stock))
    }
    handleGetTimeData()
  }, [stock])

  // reverse the time series array to display the current day last
  if (prices.length > 0) {
    var timeSlotData = prices?.map(
      (val, index, array) => array[array.length - 1 - index]
    )
  }

  const chartData = {
    labels: timeSlotData?.map((data) => {
      // change format of chart time label
      let newDate = new Date(data.date)
      let options = { hour: '2-digit', minute: '2-digit', hour12: true }
      return newDate.toLocaleTimeString('en-US', options)
    }),

    datasets: [
      {
        label: 'Stock Price',
        data: timeSlotData?.map((data) => data?.close?.toFixed(2).toString()),
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  }

  return (
    <section id='stock-price-chart'>
      <Line options={options} data={chartData} />
    </section>
  )
}

export default StockLineChart
