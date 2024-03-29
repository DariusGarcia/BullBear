import { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { useAuthContext } from '../Hooks/useAuthContext'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import SearchStockContainer from '../Components/searchStockContainer'
import { Watchlist } from '../Components/Watchlist/watchlist'
import { useLogout } from '../Hooks/useLogout'
// prettier-ignore
import {Bars3BottomLeftIcon, CogIcon, HomeIcon, PhotoIcon, PlusIcon, RectangleStackIcon, Squares2X2Icon, UserGroupIcon, XMarkIcon} from '@heroicons/react/24/outline'
import { AiOutlineStock } from 'react-icons/ai'
import { BsTextParagraph } from 'react-icons/bs'
import Spinner from '../Components/Spinners/spinner'

// prettier-ignore
const sidebarNavigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: false },
  { name: 'Dashboard', href: '/dashboard', icon: AiOutlineStock, current: true},
  { name: 'Market', href: '/market', icon: BsTextParagraph, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const { logout } = useLogout()
  const [value, setValue] = useState('')
  const [ticker, setTicker] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'BullBear - Dashboard'
  }, [])
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
    // prettier-ignore
    <>
    {/* prettier-ignore */}
      <div className='flex h-full md:pt-2 md:min-h-screen bg-grey'>
        {/* Narrow sidebar */}
        <div className='  hidden w-28 overflow-y-auto md:block'>
          <div className='flex w-full flex-col items-center py-6'>
            <div className='flex flex-shrink-0 items-center '>
              <h2 className='h-full w-full capitalize text-sm text-white'>
                {user ? user.username : 'Welcome!'}
              </h2>
            </div>
            <div className='mt-6 w-full flex-1 space-y-1 px-2 text-white'>
              {sidebarNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-primary text-white hover:bg-lightBlue transition ease-in-out delay-35'
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
                    aria-hidden='true'/>
                  <span className='mt-2'>{item.name}</span>
                </a>
              ))}
              <li key='sign out' className='cursor-pointer text-grey3 hover:bg-lightBlue transition ease-in-out delay-35 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium' aria-current='page'>
                {user ? (
                  <button onClick={() => {
                    setLoading(true);
                    setTimeout(function(){ 
                       setLoading(false) 
                       logout()
                  }, 500)}} className='mt-2 gap-2 flex flex-row md:flex-col items-center'>
                     {isLoading ? <Spinner height={30} width={30}/> : <CogIcon className='hover:text-white text-grey3 group-hover:text-white h-6 w-6' aria-hidden='true'></CogIcon>}
                    {user ? 'Sign out' : 'Log in'}
                  </button>
                ) : (
                  <button onClick={() => {
                    setLoading(true);
                    setTimeout(function(){ 
                       setLoading(false);
                       window.location.href='/login';
                    }, 500);
                }} className='gap-2 flex flex-row md:flex-col items-center mt-2'>    
                   {isLoading ? <Spinner height={30} width={30}/> : <CogIcon className='hover:text-white text-grey3 group-hover:text-white h-6 w-6' aria-hidden='true'></CogIcon>}
                    Login
              </button>
                )}
              </li>
            </div>
          </div>
        </div>

        {/* Mobile menu side menu */}
        {/* // prettier-ignore */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog as='div' className='relative z-20 md:hidden ' onClose={setMobileMenuOpen}>
            <Transition.Child as={Fragment} enter='transition-opacity ease-linear duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='transition-opacity ease-linear duration-300' leaveFrom='opacity-100' leaveTo='opacity-0'            >
              <div className='fixed inset-0  bg-grey bg-opacity-75' />
            </Transition.Child>
            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child as={Fragment} enter='transition ease-in-out duration-300 transform' enterFrom='-translate-x-full' enterTo='translate-x-0' leave='transition ease-in-out duration-300 transform' leaveFrom='translate-x-0' leaveTo='-translate-x-full'>
                <Dialog.Panel className='relative flex w-full max-w-xs flex-1 flex-col bg-primary pt-5 pb-4'>
                  <Transition.Child as={Fragment} enter='ease-in-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in-out duration-300' leaveFrom='opacity-100' leaveTo='opacity-0'>
                    <div className='absolute top-1 right-0 -mr-14 p-1'>
                      <button type='button' className='flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 bg-lightBlue  focus:ring-white' onClick={() => setMobileMenuOpen(false)}>
                        <XMarkIcon className='h-6 w-6 text-white ' aria-hidden='true'/>
                        <span className='sr-only'>Close sidebar</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex flex-shrink-0 capitalize text-sm text-white items-center px-4'>
                    {user && user.username}
                  </div>
                  <div className='mt-5 h-0 flex-1 overflow-y-auto bg-primary text-white px-2'>
                    <nav className='flex h-full flex-col'>
                      <div className='space-y-1 '>
                        {sidebarNavigation.map((item) => (
                          <a key={item.name} href={item.href} className={classNames(
                              item.current
                                ? 'bg-grey text-white'
                                : 'text-indigo-100 hover:bg-grey hover:text-white',
                              'group py-2 px-3 rounded-md flex items-center text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
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
                        <li className='cursor-pointerhover:bg-grey h-max transition ease-in-out delay-35 text-white group w-full rounded-md flex flex-row px-3 gap-3 py-2 items-center  text-sm font-medium' key='sign out' aria-current='page'>
                          {user ? 
                          (
                            <button onClick={logout} className='flex flex-row gap-2'>
                              <CogIcon className='text-white group-hover:text-white h-6 w-6' aria-hidden='true'></CogIcon>
                              {user ? 'Sign out' : 'Log in'}
                            </button>
                          ) : 
                          (
                            <a href='/login' key='login' className='flex flex-row gap-2'>
                              <CogIcon className='text-white group-hover:text-white h-6 w-6' aria-hidden='true'></CogIcon>
                              {user ? 'Log in' : 'Log in'}
                            </a>
                          )}
                        </li>
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
        <div className='flex  flex-1 h-full flex-col'>
          <header className='w-full'>
            <div className='relative z-10 flex h-16 flex-shrink-0  bg-grey  shadow-sm'>
              <button type='button' className=' px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden' onClick={() => setMobileMenuOpen(true)}>
                <span className='sr-only'>Open sidebar</span>
                <Bars3BottomLeftIcon className='h-6 w-6 text-white' aria-hidden='true'/>
              </button>
              <div className='flex flex-1 justify-between  bg-grey sm:px-6'>
                <div className='flex flex-1'>
                  <form onSubmit={handleSubmit} className='flex w-full md:ml-0 '>
                    <label htmlFor='search-field' className='sr-only'>
                      Search for stocks in the S&P500 Index
                    </label>
                    <div className='relative flex flex-row items-center w-full focus-within:text-grey3'>
                      <div className='pointer-events-none ml-4 absolute inset-y-0 left-0 flex items-center'>
                        <MagnifyingGlassIcon className='h-5 w-5 flex-shrink-0  hover:text-black text-white' aria-hidden='true'/>
                      </div>
                      <input
                        value={value}
                        onChange={handleChange}
                        onInput={(e) => (e.target.value = ('' + e.target.value).toUpperCase())}
                        name='search-field'
                        id='search-field'
                        className='h-full w-full rounded-r-lg md:rounded-lg focus-text-white focus-bg-white bg-grey py-2 pl-10 pr-3 text-base text-white placeholder-grey3 focus:border-transparent focus:grey3 focus:outline-none focus:ring-0'
                        placeholder='Search stock e.g. AAPL'
                        aria-label='search stock ticker input'
                      />
                      <button onSubmit={handleSubmit} type='submit' id='dashboard-search-stock-btn' className=' mx-4 md:mx-0s md:mb-2 md:w-1/4 md:h-16 text-sm p-4 flex text-center justify-center items-center  transition ease-in-out delay-25 bg-lightBlue bg-opacity-20 border-2 hover:bg-opacity-100 border-lightBlue text-white hover:text-white rounded-lg'>
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </header>
          {/* Main content */}
          <div className='flex flex-1 items-stretch overflow-hidden'>
            <main className='flex-1 min-h-screen justify-center md:px-4 bg-primary  border-t-2 border-grey3 '>
              {/* Primary column */}
              <section aria-labelledby='primary-heading' className='flex h-full min-w-0 md:w-full overflow-hidden flex-1 flex-col lg:order-last'>
                <h1 id='primary-heading' className='sr-only'>
                  Photos
                </h1>
                {/* Your content */}
                 
                  <SearchStockContainer ticker={ticker} />


                <div className='block my-36 py-8 bg-grey md:my-0 md:hidden'>
                  <Watchlist />
                </div>
              </section>
            </main>
            {/* Secondary column (hidden on smaller screens) */}
            <aside className='hidden md:block w-96 px-4 lg:mx-40 pt-2 overflow-x-hidden rounded-md  bg-grey3 '>
              {/* Your content */}
              <Watchlist />
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}

// const userNavigation = [
//   { name: 'Your Profile', href: '#' },
//   { name: 'Sign out', href: '#' },
// ]

// { name: 'Portfolio', href: '#', icon: UserGroupIcon, current: false },
// { name: 'Profile', href: '#', icon: RectangleStackIcon, current: false },
// { name: 'Settings', href: '#', icon: CogIcon, current: false },
