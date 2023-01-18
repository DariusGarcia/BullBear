import { BsGithub } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../Hooks/useAuthContext'
import { useLogout } from '../Hooks/useLogout'
import { MdEmail } from 'react-icons/md'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Market', href: '/market' },
    // { name: 'Profile', href: '/' },
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
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <footer className=' text-white border-t-2 border-primary bg-grey'>
      <div className='mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8'>
        <nav
          className='-mx-5 -my-2 flex flex-wrap justify-center'
          aria-label='Footer'
        >
          {navigation.main.map((item) => (
            <div
              key={item.name}
              className='px-5 py-2 hover:bg-primary hover:scale-95 transition ease-in-out delay-45 rounded-lg'
            >
              <a
                href={item.href}
                className='text-base text-gray-500 hover:text-gray-900'
              >
                {item.name}
              </a>
            </div>
          ))}
          {user && (
            <Link to='/signup'>
              <button
                onClick={logout}
                className='py-2 px-5 list-none hover:bg-primary hover:scale-95 transition ease-in-out delay-45 rounded-lg'
              >
                Sign Out
              </button>
            </Link>
          )}
          {!user && (
            <div className='flex flex-row list-none'>
              <Link to='/login '>
                <li className='px-5 py-2 hover:bg-primary hover:scale-95 transition ease-in-out delay-45 rounded-lg'>
                  Log in
                </li>
              </Link>
              <Link to='/signup'>
                <li className=' py-2 px-5 hover:bg-primary hover:scale-95 transition ease-in-out delay-45 rounded-lg'>
                  Signup
                </li>
              </Link>
            </div>
          )}
        </nav>
        <div className='mt-8 flex justify-center space-x-6'>
          {navigation.social.map((item) => (
            <a key={item.name} href={item.href} className=''>
              <span className='sr-only '>{item.name}</span>
              <span className='h-full hover:bg-primary p-2 hover:scale-95 transition ease-in-out delay-45 rounded-lg flex flex-row gap-4 items-center'>
                <BsGithub className='' size={30}></BsGithub>{' '}
                <p className='opacity-50 hover:opacity-100'>source code</p>
              </span>
            </a>
          ))}
        </div>
        {/* <p className='flex flex-row justify-center mt-8 gap-4 hover:opacity-100 items-center text-base opacity-50'>
					<MdEmail size={30} /> dariusgarcia@hotmail.com
				</p> */}
        <p className='mt-8 text-center text-base text-gray-400'>
          &copy; 2022 Darius Garcia. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
