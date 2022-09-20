import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { useAuthContext } from '../Hooks/useAuthContext'
import {
	Bars3BottomLeftIcon,
	CogIcon,
	HomeIcon,
	PhotoIcon,
	PlusIcon,
	RectangleStackIcon,
	Squares2X2Icon,
	UserGroupIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Home from './Home'
import SearchStockContainer from './searchStockContainer'
import WatchlistContainer from './watchlistContainer'
import { Watchlist } from './watchlist'
import { useLogout } from '../Hooks/useLogout'

const sidebarNavigation = [
	{ name: 'Home', href: '/', icon: HomeIcon, current: false },
	{
		name: 'Dashboard',
		href: '/test',
		icon: Squares2X2Icon,
		current: true,
	},
	{ name: 'Market', href: 'Stock Market', icon: PhotoIcon, current: false },
	{ name: 'Portfolio', href: '#', icon: UserGroupIcon, current: false },
	{ name: 'Profile', href: '#', icon: RectangleStackIcon, current: false },
	// { name: 'Settings', href: '#', icon: CogIcon, current: false },
]
const userNavigation = [
	{ name: 'Your Profile', href: '#' },
	{ name: 'Sign out', href: '#' },
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
	const { logout } = useLogout()
	const [value, setValue] = useState('')
	const [ticker, setTicker] = useState([])

	const handleChange = (event) => {
		const stock = event.target.value.trim()
		setValue(stock)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if (!ticker.includes(value)) {
			setTicker(ticker.concat(value))
			setValue('')
		}
	}

	const { user } = useAuthContext()
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<>
			{user && (
				<div className='flex h-full md:min-h-screen bg-grey '>
					{/* Narrow sidebar */}
					<div className='hidden w-28 mt-2 overflow-y-auto md:block'>
						<div className='flex w-full flex-col items-center py-6'>
							<div className='flex flex-shrink-0 items-center '>
								<h2 className='h-full w-full text-white'>
									{user.email?.split('@')[0]}
								</h2>
							</div>
							<div className='mt-6 w-full flex-1 space-y-1 px-2 text-white'>
								{sidebarNavigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className={classNames(
											item.current
												? 'bg-primary text-white'
												: 'text-grey3 hover:bg-lightBlue transition ease-in-out delay-35 hover:text-white',
											'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
										)}
										aria-current={item.current ? 'page' : undefined}>
										<item.icon
											className={classNames(
												item.current
													? 'text-white'
													: 'text-grey3 group-hover:text-white',
												'h-6 w-6'
											)}
											aria-hidden='true'
										/>
										<span className='mt-2'>{item.name}</span>
									</a>
								))}
								<li
									onClick={logout}
									key='sign out'
									className='
									cursor-pointer
										 text-grey3 hover:bg-lightBlue transition ease-in-out delay-35 hover:text-white
										group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
									aria-current='page'>
									<CogIcon
										className='hover:text-white text-grey3 group-hover:text-white
									h-6 w-6'
										aria-hidden='true'></CogIcon>
									{user ? (
										<button onClick={logout} className='mt-2'>
											{user ? 'Signout' : 'Log in'}
										</button>
									) : (
										<button onClick={logout} className='mt-2'>
											{user ? 'Log in' : 'Log in'}
										</button>
									)}
								</li>
							</div>
						</div>
					</div>

					{/* Mobile menu */}
					<Transition.Root show={mobileMenuOpen} as={Fragment}>
						<Dialog
							as='div'
							className='relative z-20 md:hidden'
							onClose={setMobileMenuOpen}>
							<Transition.Child
								as={Fragment}
								enter='transition-opacity ease-linear duration-300'
								enterFrom='opacity-0'
								enterTo='opacity-100'
								leave='transition-opacity ease-linear duration-300'
								leaveFrom='opacity-100'
								leaveTo='opacity-0'>
								<div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
							</Transition.Child>

							<div className='fixed inset-0 z-40 flex'>
								<Transition.Child
									as={Fragment}
									enter='transition ease-in-out duration-300 transform'
									enterFrom='-translate-x-full'
									enterTo='translate-x-0'
									leave='transition ease-in-out duration-300 transform'
									leaveFrom='translate-x-0'
									leaveTo='-translate-x-full'>
									<Dialog.Panel className='relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4'>
										<Transition.Child
											as={Fragment}
											enter='ease-in-out duration-300'
											enterFrom='opacity-0'
											enterTo='opacity-100'
											leave='ease-in-out duration-300'
											leaveFrom='opacity-100'
											leaveTo='opacity-0'>
											<div className='absolute top-1 right-0 -mr-14 p-1'>
												<button
													type='button'
													className='flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-white'
													onClick={() => setMobileMenuOpen(false)}>
													<XMarkIcon
														className='h-6 w-6 text-white'
														aria-hidden='true'
													/>
													<span className='sr-only'>Close sidebar</span>
												</button>
											</div>
										</Transition.Child>
										<div className='flex flex-shrink-0 items-center px-4'>
											<img
												className='h-8 w-auto'
												src='https://tailwindui.com/img/logos/mark.svg?color=white'
												alt='Your Company'
											/>
										</div>
										<div className='mt-5 h-0 flex-1 overflow-y-auto bg-primary text-white px-2'>
											<nav className='flex h-full flex-col'>
												<div className='space-y-1'>
													{sidebarNavigation.map((item) => (
														<a
															key={item.name}
															href={item.href}
															className={classNames(
																item.current
																	? 'bg-red text-white'
																	: 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
																'group py-2 px-3 rounded-md flex items-center text-sm font-medium'
															)}
															aria-current={item.current ? 'page' : undefined}>
															<item.icon
																className={classNames(
																	item.current
																		? 'text-white'
																		: 'text-indigo-300 group-hover:text-white',
																	'mr-3 h-6 w-6'
																)}
																aria-hidden='true'
															/>
															<span>{item.name}</span>
														</a>
													))}
												</div>
											</nav>
										</div>
									</Dialog.Panel>
								</Transition.Child>
								<div className='w-14 flex-shrink-0' aria-hidden='true'>
									{/* Dummy element to force sidebar to shrink to fit close icon */}
								</div>
							</div>
						</Dialog>
					</Transition.Root>

					{/* Content area */}
					<div className='flex mt-2 flex-1 h-full flex-col '>
						<header className='w-full'>
							<div className='relative z-10 flex h-16 flex-shrink-0  bg-white shadow-sm'>
								<button
									type='button'
									className=' px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
									onClick={() => setMobileMenuOpen(true)}>
									<span className='sr-only'>Open sidebar</span>
									<Bars3BottomLeftIcon className='h-6 w-6' aria-hidden='true' />
								</button>
								<div className='flex flex-1 justify-between  bg-grey sm:px-6'>
									<div className='flex flex-1'>
										<form
											onSubmit={handleSubmit}
											className='flex w-full md:ml-0 '>
											<label htmlFor='search-field' className='sr-only'>
												Search for stocks in the S&P500 Index
											</label>
											<div className='relative flex flex-row md:gap-12 items-center w-full focus-within:text-grey3'>
												<div className='pointer-events-none ml-4 absolute inset-y-0 left-0 flex items-center'>
													<MagnifyingGlassIcon
														className='h-5 w-5 flex-shrink-0  hover:text-black text-white'
														aria-hidden='true'
													/>
												</div>
												<input
													value={value}
													onChange={handleChange}
													onInput={(e) =>
														(e.target.value = (
															'' + e.target.value
														).toUpperCase())
													}
													name='search-field'
													id='search-field'
													className='h-full w-full focus-text-white focus-bg-white bg-grey border-transparent py-2 pl-10 pr-3 text-base text-white placeholder-grey3 focus:border-transparent focus:grey3 focus:outline-none focus:ring-0'
													placeholder='Search ticker e.g. MSFT'
													type='text'
													aria-label='search stock ticker input'
												/>
												<button
													onSubmit={handleSubmit}
													className='w-2/5 max-w-[216px] mx-4 md:mx-0s md:w-auto md:h-12 text-sm p-4 flex text-center justify-center items-center hover:scale-105 transition ease-in-out delay-25 bg-lightBlue bg-opacity-20 border-2 hover:bg-opacity-100 border-lightBlue text-white hover:text-white rounded-lg'>
													Search
												</button>
											</div>
										</form>
									</div>
									{/* <div className='ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6'> */}
									{/* Profile dropdown */}
									{/* <Menu as='div' className='relative flex-shrink-0'>
										<div>
											<Menu.Button className='flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
												<span className='sr-only'>Open user menu</span>
												<img
													className='h-8 w-8 rounded-full'
													src='https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
													alt=''
												/>
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter='transition ease-out duration-100'
											enterFrom='transform opacity-0 scale-95'
											enterTo='transform opacity-100 scale-100'
											leave='transition ease-in duration-75'
											leaveFrom='transform opacity-100 scale-100'
											leaveTo='transform opacity-0 scale-95'>
											<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
												{userNavigation.map((item) => (
													<Menu.Item key={item.name}>
														{({ active }) => (
															<a
																href={item.href}
																className={classNames(
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2 text-sm text-gray-700'
																)}>
																{item.name}
															</a>
														)}
													</Menu.Item>
												))}
											</Menu.Items>
										</Transition>
									</Menu>

									<button
										type='button'
										className='flex items-center justify-center rounded-full bg-indigo-600 p-1 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
										<PlusIcon className='h-6 w-6' aria-hidden='true' />
										<span className='sr-only'>Add file</span>
									</button>
								</div> */}
								</div>
							</div>
						</header>

						{/* Main content */}
						<div className='flex flex-1 items-stretch  overflow-hidden '>
							<main className='flex-1 min-h-screen bg-primary'>
								{/* Primary column */}
								<section
									aria-labelledby='primary-heading'
									className='flex h-full min-w-0 md:w-full overflow-hidden mt-4 md:ml-4 flex-1 flex-col lg:order-last'>
									<h1 id='primary-heading' className='sr-only'>
										Photos
									</h1>
									{/* Your content */}
									<SearchStockContainer ticker={ticker} />
									<div className='block my-16 bg-grey md:my-0 md:hidden'>
										<Watchlist />
									</div>
								</section>
							</main>

							{/* Secondary column (hidden on smaller screens) */}
							<aside className='hidden md:block w-96 md:mx-40 mt-20 overflow-x-hidden   '>
								{/* Your content */}
								<Watchlist />
							</aside>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
