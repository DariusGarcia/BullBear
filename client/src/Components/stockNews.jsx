import { useState, useEffect } from 'react'

export default function StockNews() {
	const [news, setNews] = useState([])

	useEffect(() => {
		const fetchNews = async () => {
			const response = await fetch(
				'https://fmpcloud.io/api/v3/stock_news?limit=50&apikey=519b0d38ac484284abb5ed5338c2db0b'
			)
				.then((res) => res.json())
				.then((data) => setNews(data))
				.then((data) => console.log(data))
				.catch((err) => console.log(err))

			return response
		}
		fetchNews()
	}, [])
	return (
		<section className='h-[550px] overflow-y-auto mb-12'>
			{news.map((newsArticle) => (
				<a
					target='_blank'
					href={newsArticle.url}
					rel='noreferrer'
					className='hover:opacity-60'>
					<article className=''>
						<ul className='flex flex-col  bg-grey my-2 border-b p-2 gap-y-2  '>
							<li className=''>${newsArticle.symbol}</li>
							<li className=''>{newsArticle.title}</li>
							<li className=''>
								<img
									className='w-24 h-16'
									src={newsArticle.image}
									alt={newsArticle.title}></img>
							</li>
							<li className='italic text-sm'>
								{newsArticle.text?.substring(0, 100)}...
							</li>
							<li className='text-sm opacity-50 flex flex-row'>
								{newsArticle.site} {newsArticle.publishedDate.substring(0, 10)}
							</li>
						</ul>
					</article>
				</a>
			))}
		</section>
	)
}
