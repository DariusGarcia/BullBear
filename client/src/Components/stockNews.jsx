import { useState, useEffect } from 'react'
import time_ago from '../utils/timeAgo'
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
		<>
			{news && (
				<section className='h-[550px] overflow-y-auto mb-12'>
					{news.map((newsArticle) => (
						<a
							target='_blank'
							href={newsArticle.url}
							rel='noreferrer'
							className='hover:opacity-60'>
							<article
								key={newsArticle.id}
								className='rounded-lg shadow-lg my-4 '>
								<ul className='grid grid-cols-2  bg-grey my-2  p-2 gap-y-  rounded-md md:mr-4  '>
									<div className='flex flex-col justify-evenly'>
										<li key='article title' className='text-lightBlue '>
											{newsArticle.site}
										</li>
										<li key='article title' className=' md:text-base '>
											${newsArticle.symbol}
										</li>
										<li key='article title' className='text-xs md:text-base '>
											{newsArticle.title}
										</li>

										<li
											key='article text'
											className='hidden md:block italic text-sm opacity-70'>
											{newsArticle.text?.substring(0, 150)}...
										</li>
										<li
											key='article site'
											className='text-xs md:text-sm opacity-50 flex flex-row'>
											{time_ago(newsArticle.publishedDate)}
										</li>
									</div>
									<div className=''>
										<li
											key='article image'
											className='flex justify-end  h-full items-center'>
											<img
												className='w-32 h-32 md:w-60 md:h-48 p-4  rounded-md object-cover'
												src={newsArticle.image}
												alt={newsArticle.title}></img>
										</li>
									</div>
								</ul>
							</article>
						</a>
					))}
				</section>
			)}
		</>
	)
}
