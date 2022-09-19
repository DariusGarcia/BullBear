import { BsGithub } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../Hooks/useAuthContext'

const navigation = {
	main: [
		{ name: 'Home', href: '/' },
		{ name: 'Market', href: '/dashboard' },
		{ name: 'Profile', href: '/' },
	],
	social: [
		{
			name: 'Github',
			href: 'https://github.com/dariusgarcia/bullbear',
			icon: <BsGithub size={25}></BsGithub>,
		},
	],
}

export default function Footer() {
	const { user } = useAuthContext()
	return (
		<footer className='bg-grey text-white'>
			<div className='mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8'>
				<nav
					className='-mx-5 -my-2 flex flex-wrap justify-center'
					aria-label='Footer'>
					{navigation.main.map((item) => (
						<div
							key={item.name}
							className='px-5 py-2 hover:bg-grey2 hover:scale-95 transition ease-in-out delay-45 rounded-lg'>
							<a
								href={item.href}
								className='text-base text-gray-500 hover:text-gray-900'>
								{item.name}
							</a>
						</div>
					))}
					{user && (
						<Link to='/signup'>
							<li className='py-2 px-5 list-none hover:bg-grey2 hover:scale-95 transition ease-in-out delay-45 rounded-lg'>
								Sign Out
							</li>
						</Link>
					)}
					{!user && (
						<div className='flex flex-row list-none'>
							<Link to='/login '>
								<li className='px-5 py-2 hover:bg-grey2 hover:scale-95 transition ease-in-out delay-45 rounded-lg'>
									Login
								</li>
							</Link>
							<Link to='/signup'>
								<li className=' py-2 px-5 hover:bg-grey2 hover:scale-95 transition ease-in-out delay-45 rounded-lg'>
									Signup
								</li>
							</Link>
						</div>
					)}
				</nav>
				<div className='mt-8 flex justify-center space-x-6'>
					{navigation.social.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className='text-gray-400 hover:text-gray-500'>
							<span className='sr-only '>{item.name}</span>
							<span className='hover:bg-grey2'>
								<BsGithub
									className='h-full hover:text-grey2  hover:scale-95 transition ease-in-out delay-45 rounded-lg'
									size={30}></BsGithub>
							</span>
						</a>
					))}
				</div>
				<p className='mt-8 text-center text-base text-gray-400'>
					&copy; 2022 Darius Garcia. All rights reserved.
				</p>
			</div>
		</footer>
	)
}
