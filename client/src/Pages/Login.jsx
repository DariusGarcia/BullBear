import { useState } from 'react'
import { useLogin } from '../Hooks/useLogin'
import { HiLockClosed } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import Navbar from '../Components/navbar'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(username, password)
  }

  return (
    <>
      <Navbar />
      <div className='flex min-h-full pb-56 items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-primary'>
        <div className='w-full max-w-md space-y-8 text-white'>
          <div>
            <h1 className='flex justify-center text-4xl font-semibold'>
              Login
            </h1>
            <h2 className='mt-6 text-center text-3xl tracking-tight opacity-70'>
              Sign in to your account
            </h2>
          </div>
          <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='-space-y-px rounded-md shadow-sm'>
              <div>
                <label htmlFor='username-address' className='sr-only'>
                  username address
                </label>
                {error && (
                  <div className='text-red pb-2 font-semibold'>{error}</div>
                )}
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  id='username-address'
                  name='username'
                  type='username'
                  autoComplete='username'
                  required
                  className='relative text-black block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  placeholder='Username'
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='relative text-black block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  placeholder='Password'
                />
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                />
                <label
                  htmlFor='remember-me'
                  className='ml-2 block text-sm text-gray-900'
                >
                  Remember me
                </label>
              </div>
            </div>
            <div>
              <button
                disabled={isLoading}
                type='submit'
                className='group relative flex w-full justify-center rounded-md cursor-pointer  hover:scale-95 transition ease-in-out hover:bg-opacity-60 bg-lightBlue py-2 px-4  font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  <HiLockClosed size={25}></HiLockClosed>
                </span>
                Login
              </button>
            </div>
          </form>
          <section className='flex flex-row gap-8 items-center pt-12'>
            <p className=''>Don't have an account yet?</p>
            <Link to='/signup'>
              <p className='border-2 border-lightBlue rounded-lg hover:scale-105 transition ease-in-out delay-55 px-6 py-2'>
                Sign up
              </p>
            </Link>
          </section>
        </div>
      </div>
    </>
  )
}
