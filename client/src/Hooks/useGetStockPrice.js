const BASE_URL = ' https://alpha-vantage.p.rapidapi.com/'

export const fetchPrice = (props) => {
	const { name } = props
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '0d97302266msh6b2a73e1ff1a13dp1c8242jsn8cf1b0c3f629',
			'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
		},
	}
	return (
		fetch(
			`${BASE_URL}query?function=GLOBAL_QUOTE&symbol=${name}&datatype=json`,
			options
		)
			.then((response) => response.json())
			.then((data) => data['Global Quote']['05. price'])
			// .then((data) => console.log(data['Global Quote']['05. price']))
			.catch((err) => console.error(err))
	)
}
