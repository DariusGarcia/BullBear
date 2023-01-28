export const UseFetchTopGainers = async (query) => {
  const api =
    process.env.REACT_APP_MARKET_ACTIVITY +
    `${query}?apikey=` +
    process.env.REACT_APP_API_KEY

  return await fetch(api)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err))
}
