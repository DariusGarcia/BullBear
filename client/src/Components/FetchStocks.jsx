import React, { useState, useEffect } from 'react';
function FetchStocks(props) {
	const [ticker, setTicker] = useState([]);
	const [openPrice, setOpenPrice] = useState([]);
	const [tickerPrice, setTickerPrice] = useState([]);
	const [tradingDay, setTradingDay] = useState([]);
	const [closingPrice, setClosingPrice] = useState([]);
	const [volume, setVolume] = useState([]);
	const [dayPercentage, setDayPercentage] = useState([]);

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
				'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
			},
		};
		fetch(
			`https://alpha-vantage.p.rapidapi.com/query?function=GLOBAL_QUOTE&symbol=${props.name}&datatype=json`,
			options
		)
			.then((response) => response.json())

			.then((data) => {
				const res = data['Global Quote'];
				const myRes = Object.values(res);
				setTicker(myRes[0]);
				setOpenPrice((myRes[1] / 1).toFixed(2));
				setTickerPrice((myRes[4] / 1).toFixed(2));
				setClosingPrice((myRes[7] / 1).toFixed(2));
				setVolume((myRes[5] / 1).toLocaleString('en', { useGrouping: true }));
				setTradingDay(myRes[6]);

				// calculates the % difference between the previous days closing price and the current price
				setDayPercentage((((myRes[4] - myRes[7]) / myRes[7]) * 100).toFixed(2));
				console.log(`${myRes[0]}`);
				console.log(myRes);
			})
			.catch((err) => console.error(err));
		// console.log(response);
	}, [props.name]);

	let info;

	if (ticker) {
		info = (
			<>
				<nav className='h-full w-full hover:border-2 border-lightBlue hover:rounded-xl '>
					<ul className='h-full flex items-center px-2'>
						<li className='w-1/6 text-lightBlue'>${ticker}</li>
						<li className='w-1/6'>${tickerPrice}</li>
						<li className='w-1/6'>${openPrice}</li>
						<li className='w-1/6'>${closingPrice}</li>
						<li className='w-1/6'>{dayPercentage}%</li>
						<li className='w-1/6'>{volume}</li>
						<li className='w-1/6'>{tradingDay}</li>
					</ul>
				</nav>
			</>
		);
	} else if (ticker == null) {
		info = (
			<span className='flex w-full h-full justify-center items-center hover:border-2 border-lightBlue hover:rounded-xl '>
				<p id='class-nf' className='w-full pl-2 text-red font-bold   '>
					Invalid stock ticker...
				</p>
			</span>
		);
	} else {
		info = (
			<p className='hover:border-2 border-lightBlue hover:rounded-xl'>
				Loading...
			</p>
		);
	}

	return (
		<div className='flex h-12 w-1/2 md:w-full my-4 text-sm md:text-base bg-primary rounded-xl'>
			{info}
		</div>
	);
}

export default FetchStocks;
