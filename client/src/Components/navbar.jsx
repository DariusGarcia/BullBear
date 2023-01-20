import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { useAuthContext } from '../Hooks/useAuthContext'
import { Link } from 'react-router-dom'
import { useLogout } from '../Hooks/useLogout'
import { AiOutlineMenu } from 'react-icons/ai'
import { VscChromeClose } from 'react-icons/vsc'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Dashboard', href: '/dashboard', current: true },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <Disclosure
      as='nav'
      className='sticky top-0 z-50 bg-grey rounded-b-md border-b-2 border-primary'
    >
      {({ open }) => (
        <div className=''>
          <div className='mx-auto px-4'>
            <div className='flex h-20 justify-between md:justify-between'>
              <div className='flex'>
                <div className='-ml-2 mr-2 flex items-center md:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-opacity-30 focus:ring-white'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <VscChromeClose
                        size={25}
                        className='block h-6 w-6'
                        aria-hidden='true'
                      />
                    ) : (
                      <AiOutlineMenu
                        size={25}
                        className='block h-6 w-6'
                        aria-hidden='true'
                      />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='flex flex-shrink-0 items-center'>
                  <a
                    href='/'
                    className='flex flex-shrink-0 items-center text-white text-2xl font-semibold md:text-4xl'
                  >
                    BullBear
                  </a>
                  <a
                    href='/'
                    className='hidden h-8 w-auto lg:block text-white text-2xl font-semibold md:text-4xl'
                  >
                    BullBear
                  </a>
                </div>
                <div className='hidden md:ml-6 md:flex md:items-center md:space-x-4'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white hover:bg-primary hover:scale-95 transition ease-in-out delay-45 rounded-lg'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                  <a
                    className='bg-gray-900 text-white hover:bg-primary hover:scale-95 transition ease-in-out delay-45 rounded-lg p-2 text-sm'
                    href='/market'
                  >
                    Market
                  </a>

                  {!user && (
                    <div className='flex flex-row gap-4 list-none text-white text-sm font-medium'>
                      <Link to='/signup'>
                        <li className='hover:bg-primary hover:scale-95 transition ease-in-out delay-45 rounded-lg px-3 py-2'>
                          Signup
                        </li>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  {user && (
                    <button
                      onClick={handleClick}
                      type='button'
                      className='relative inline-flex gap-2 items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium hover:border-grey2 hover:bg-primary hover:scale-105 transition ease-in-out delay-45 text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800'
                    >
                      <span>Sign Out</span>
                    </button>
                  )}
                  {!user && (
                    <a
                      href='/login'
                      className='relative inline-flex gap-2 items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium hover:border-grey2 hover:bg-primary hover:scale-105 transition ease-in-out delay-45 text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800'
                    >
                      Log in
                    </a>
                  )}
                </div>
                <div className='hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center'>
                  {/* Profile dropdown */}
                  <Menu as='div' className='relative ml-3'>
                    <div>
                      <Menu.Button className='flex rounded-full bg-gray-800 text-sm  '>
                        <span className='sr-only'>Open user menu</span>
                        <h2 className='px-4 py-2  flex text-center justify-center items-center hover:scale-105 transition ease-in-out delay-25 bg-lightBlue bg-opacity-20 border-2 hover:bg-opacity-100 border-lightBlue text-white hover:text-white rounded-lg mb-6 md:mb-0'>
                          {user ? user.username : 'Welcome!'}
                        </h2>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-200'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='md:hidden text-white bg-primary'>
            <div className='space-y-1 px-2 pt-2  pb-3 sm:px-3  '>
              <Disclosure.Button
                key={user?.username}
                as='a'
                className=' text-white'
              >
                <header className='flex justify-end w-max ml-2 mb-4 border-b-[1px] border-opacity-60 '>
                  {user
                    ? `Welcome ${user?.username}`
                    : 'Welcome! Please log in to add to a watchlist.'}
                </header>
                <ul className='flex flex-col items-start gap-4 text-sm md:text-lg cursor-pointer'>
                  {user && (
                    <div className='flex flex-col gap-4'>
                      <Link to='/'>
                        <li className='hover:bg-grey rounded-md p-2'>Home</li>
                      </Link>
                      <Link to='/dashboard'>
                        <li className='hover:bg-grey rounded-md p-2'>
                          Dashboard
                        </li>
                      </Link>
                      <Link to='/market'>
                        <li className='hover:bg-grey rounded-md p-2'>Market</li>
                      </Link>

                      <li className='hover:bg-grey rounded-md p-2'>
                        <button onClick={handleClick()}>Sign Out</button>
                      </li>
                    </div>
                  )}
                  {!user && (
                    <div className='flex flex-col gap-4'>
                      <Link to='/'>
                        <li className='hover:bg-grey rounded-md p-2'>Home</li>
                      </Link>
                      <Link to='/dashboard'>
                        <li className='hover:bg-grey rounded-md p-2'>
                          Dashboard
                        </li>
                      </Link>
                      <Link to='/market'>
                        <li className='hover:bg-grey rounded-md p-2'>Market</li>
                      </Link>
                      <Link to='/login'>
                        <li className='hover:bg-grey rounded-md p-2'>Log in</li>
                      </Link>
                      <Link to='/signup'>
                        <li className='hover:bg-grey rounded-md p-2'>
                          Signup{' '}
                        </li>
                      </Link>
                    </div>
                  )}
                </ul>
              </Disclosure.Button>
            </div>
            <div className='border-t border-white  pb-3 bg-primary'>
              <div className='sm:px-3 '>
                <Disclosure.Button
                  key={user?.username}
                  as='a'
                  className='block  px-2 text-base font-medium'
                >
                  {' '}
                  <div className='flex flex-row cursor-pointer items-center gap-2 justify-start mt-3 text-white opacity-60 hover:text-red hover:opacity-100 px-2'>
                    {' '}
                    CLOSE <VscChromeClose />
                  </div>
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}
