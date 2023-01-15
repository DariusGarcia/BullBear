export const UseFetchChartPriceData = async (stock) => {
  const api =
    process.env.REACT_APP_BROADMARKET_URL +
    'historical-chart/30min/' +
    `${stock}?apikey=` +
    process.env.REACT_APP_API_KEY

  return await fetch(api)
    .then((results) => results.json())
    .then((data) => data.splice(0, 14))
    .catch((err) => console.log(err))
}
