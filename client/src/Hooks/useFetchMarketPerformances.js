export const UseFetchMarketPerformances = async (query) => {
  const api =
    process.env.REACT_APP_MARKET_ACTIVITY +
    `${query}?apikey=` +
    process.env.REACT_APP_API_KEY

  const data = await fetch(api)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err))

  return data
}
