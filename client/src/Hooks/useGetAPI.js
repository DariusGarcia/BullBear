export const UseGetAPI = async (stock) => {
	const api =
		process.env.REACT_APP_BASE_URL +
		`${stock}?apikey=` +
		process.env.REACT_APP_API_KEY

	return await fetch(api)
		.then((results) => results.json())
		.then((data) => data)
		.catch((err) => console.log(err))
}
