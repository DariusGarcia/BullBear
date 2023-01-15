export const UseFetchChartData = async (stock) => {
  const api =
    process.env.REACT_APP_BROADMARKET_URL +
    'historical-price-full/' +
    `${stock}?serietype=line&apikey=` +
    process.env.REACT_APP_API_KEY

  const chartData = await fetch(api)
    .then((results) => results.json())
    .then((data) => data)
    .catch((err) => console.log(err))
  // console.log(
  //   '🚀 ~ file: useFetchChartData.js:12 ~ UseFetchChartData ~ chartData',
  //   chartData['historical']
  // )

  return chartData
}
