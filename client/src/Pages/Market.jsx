import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useAuthContext } from '../Hooks/useAuthContext'
import { Watchlist } from '../Components/Watchlist/watchlist'
import { BiNews } from 'react-icons/bi'
import { SiMarketo } from 'react-icons/si'
import { useLogout } from '../Hooks/useLogout'
import IndexPerformances from '../Components/BroadMarket/IndexPerformances'
import StockNews from '../Components/StockCard/stockNews'
import SectorPerformances from '../Components/BroadMarket/sectorPerformances'
// prettier-ignore
import { Bars3BottomLeftIcon, CogIcon, HomeIcon, XMarkIcon} from '@heroicons/react/24/outline'
import { AiOutlineStock } from 'react-icons/ai'
import { BsTextParagraph } from 'react-icons/bs'
import ActiveMovers from '../Components/ActiveMovers/activeMovers'
import activeMoversData from '../Components/ActiveMovers/tableData.json'

// prettier-ignore
const sidebarNavigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: false },
  { name: 'Dashboard', href: '/dashboard', icon: AiOutlineStock, current: false},
  { name: 'Market', href: '/market', icon: BsTextParagraph, current: true },]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const queryList = ['gainers', 'losers', 'active']

export default function Market() {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <div className='w-full flex h-full md:min-h-screen bg-grey'>
        {/* Narrow sidebar */}
        <div className=' hidden w-28 overflow-y-auto md:block'>
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
                  aria-current={item.current ? 'page' : undefined}
                >
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
                key='sign out'
                className='cursor-pointer text-grey3 hover:bg-lightBlue transition ease-in-out delay-35 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium'
                aria-current='page'
              >
                {user ? (
                  <button
                    onClick={logout}
                    className='mt-2 gap-2 flex flex-row md:flex-col items-center'
                  >
                    <CogIcon
                      className='hover:text-white text-grey3 group-hover:text-white
									h-6 w-6'
                      aria-hidden='true'
                    ></CogIcon>
                    {user ? 'Sign out' : 'Log in'}
                  </button>
                ) : (
                  <a
                    href='/login'
                    key='login'
                    className='gap-2 flex flex-row md:flex-col items-center mt-2'
                  >
                    <CogIcon
                      className='hover:text-white text-grey3 group-hover:text-white
									h-6 w-6'
                      aria-hidden='true'
                    ></CogIcon>
                    {user ? 'Log in' : 'Log in'}
                  </a>
                )}
              </li>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {/* prettier-ignore */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-20 md:hidden '
            onClose={setMobileMenuOpen}
          >
            <Transition.Child as={Fragment} enter='transition-opacity ease-linear duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='transition-opacity ease-linear duration-300' leaveFrom='opacity-100' leaveTo='opacity-0'>
              <div className='fixed inset-0 bg-grey bg-opacity-75' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child as={Fragment} enter='transition ease-in-out duration-300 transform' enterFrom='-translate-x-full' enterTo='translate-x-0' leave='transition ease-in-out duration-300 transform' leaveFrom='translate-x-0' leaveTo='-translate-x-full'>
                <Dialog.Panel className='relative flex w-full max-w-xs flex-1 flex-col bg-primary pt-5 pb-4'>
                  <Transition.Child as={Fragment} enter='ease-in-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in-out duration-300' leaveFrom='opacity-100' leaveTo='opacity-0'>
                    <div className='absolute top-1 right-0 -mr-14 p-1'>
                      <button
                        type='button'
                        className='flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 bg-lightBlue focus:ring-white'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <XMarkIcon
                          className='h-6 w-6 text-white '
                          aria-hidden='true'
                        />
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
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
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
                        <li
                          key='sign out'
                          className='cursor-pointer hover:bg-grey h-max transition ease-in-out delay-35 text-white group w-full rounded-md flex flex-row px-3 gap-3 py-2 items-center text-sm font-medium'
                          aria-current='page'
                        >
                          {user ? (
                            <button
                              onClick={logout}
                              className='mt-2 gap-2 flex flex-row md:flex-col items-center'
                            >
                              <CogIcon className='text-white group-hover:text-white h-6 w-6' aria-hidden='true'>
                              </CogIcon>
                              {user ? 'Sign out' : 'Log in'}
                            </button>
                          ) : (
                            <a
                              href='/login'
                              key='login'
                              className='gap-2 flex flex-row md:flex-col items-center mt-2'
                            >
                              <CogIcon
                                className='text-white group-hover:text-white h-6 w-6'
                                aria-hidden='true'
                              ></CogIcon>
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
        <div className='flex  flex-1 h-full flex-col '>
          <header className='w-full'>
            <div className='relative z-10 flex h-16 flex-shrink-0  bg-grey shadow-sm'>
              <button
                type='button'
                className=' px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className='sr-only'>Open sidebar</span>
                <Bars3BottomLeftIcon
                  className='h-6 w-6 text-white'
                  aria-hidden='true'
                />
              </button>
              <div className='flex flex-1 justify-between  bg-grey sm:px-6 w-full'>
                <a
                  href='/dashboard'
                  className='text-white flex items-center text-2xl justify-end w-full mr-4'
                >
                  BullBear
                </a>
              </div>
            </div>
          </header>

          {/* Main content */}
          <div className='flex flex-1 items-stretch overflow-hidden text-white '>
            <main className='flex-1 min-h-screen  justify-center md:px-4 bg-primary border-t-2 border-grey3 '>
              {/* Primary column */}
              <section
                aria-labelledby='primary-heading'
                className='flex h-full min-w-0 md:w-full overflow-hidden mt-4 flex-1 flex-col lg:order-last'
              >
                {/* Your content */}
                <h1 id='primary-heading' className='sr-only'>
                  Broad Market Performance
                </h1>
                <h1 className='text-xl md:text-3xl mb-4 mt-2 pl-6 flex flex-row gap-4 items-center'>
                  Market Performance <SiMarketo size={20} />
                </h1>
                {/* Most active market movers */}
                <article className='mb-4 '>
                  {queryList.map((query) => {
                    return (
                      <section className='my-4'>
                        <ActiveMovers
                          activeMoversData={activeMoversData}
                          query={query}
                        />
                      </section>
                    )
                  })}
                  <div className='flex flex-col items-center md:items-start mb-2 '>
                    <h2 className='text-xl md:text-2xl  mt-2 flex flex-row gap-2 items-center'>
                      Indexes
                    </h2>
                    <h3 className='mb-2 flex flex-row gap-2 items-center'>
                      Daily
                    </h3>
                  </div>
                  <IndexPerformances />
                </article>
                <article>
                  <div className='flex flex-col items-center md:items-start mb-2'>
                    <h2 className='text-xl md:text-2xl mb-2 mt-4 flex flex-row gap-2 items-center'>
                      Sectors
                    </h2>
                    <h3 className='mb-2 flex flex-row gap-2 items-center'>
                      Daily
                    </h3>
                  </div>
                  <SectorPerformances />
                </article>
                <article className='mx-2'>
                  <h2 className='text-xl md:text-2xl mt-8 mb-4 flex flex-row gap-2 items-center '>
                    Stock News <BiNews />{' '}
                  </h2>
                  <StockNews />
                </article>
                <article className='bg-grey md:hidden block mb-12 rounded-lg'>
                  <Watchlist />
                </article>
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
