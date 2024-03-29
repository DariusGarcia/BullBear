import { useEffect } from 'react'
import { useAuthContext } from '../Hooks/useAuthContext'
import { Link } from 'react-router-dom'
import screenshot from '../assets/laptop.png'
import gif from '../assets/bullbearphonegif.gif'
import market from '../assets/market.png'
import { BsArrowRightSquare, BsArrowReturnRight } from 'react-icons/bs'
import Navbar from '../Components/Layout/navbar'

export default function Landing() {
  const { user } = useAuthContext()

  useEffect(() => {
    document.title = 'BullBear Market'
  }, [])

  return (
    <>
      <Navbar />
      <div className='bg-white'>
        <div className='relative overflow-hidden'>
          <main className=''>
            <div className='flex justify-center bg-grey pt-6 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14'>
              <div className='mx-auto md:w-5/6 max-w-7xl lg:px-8'>
                <div className='md:grid md:grid-cols-2 lg:gap-8 pb-48 md:h-full'>
                  <div className='mx-auto max-w-md px-4 md:px-0 sm:max-w-2xl sm:text-center lg:flex lg:items-center lg:text-left'>
                    <div className='lg:py-24 '>
                      <Link to='/dashboard'>
                        <h1
                          className='inline-flex gap-4 items-center rounded-full bg-primary
											p-4 md:p-6 text-white sm:text-base lg:text-xl hover:bg-opacity-40 transition ease-in-out delay-55
											'
                        >
                          <BsArrowReturnRight size={20}></BsArrowReturnRight>
                          BullBear Market{' '}
                        </h1>
                      </Link>
                      <h1 className='my-4 text-2xl font-bold tracking-tight text-white  sm:text-6xl md:text-3xl lg:mt-6 xl:text-6xl'>
                        <span className='block'>
                          A quick way to keep track of your favorite stocks for
                          free.
                        </span>
                      </h1>
                      <p className='text-base text-white opacity-70 sm:text-xl lg:text-lg xl:text-xl'>
                        View details about all stocks in the S&P500 Index and
                        add them to your watchlist.
                      </p>
                      <div className='mt-6 sm:mt-12'>
                        <div className='sm:mx-auto sm:max-w-xl lg:mx-0'>
                          {user ? (
                            <div className='sm:mt-0 sm:ml-3'>
                              <Link to='/dashboard'>
                                <button
                                  type='submit'
                                  className='flex flex-row  justify-center items-center gap-4 w-5/6 rounded-md bg-lightBlue h-12 hover:border-white hover:border-2 font-medium text-white focus:outline-none hover:bg-opacity-80 hover:scale-105 transition ease-in-out delay-55 focus:ring-2 focus:ring-lightBlue focus:ring-offset-2 focus:ring-offset-grey'
                                >
                                  Go to stock dashboard
                                  <BsArrowRightSquare
                                    size={30}
                                  ></BsArrowRightSquare>
                                </button>
                              </Link>
                            </div>
                          ) : (
                            <div className='grid grid-cols-2 gap-x-4 '>
                              <Link to='/signup'>
                                {' '}
                                <button className='block w-full rounded-md border-2 border-lightBlue  h-12 font-medium hover:text-white text-lightBlue focus:outline-none hover:scale-105 transition ease-in-out delay-55 focus:ring-2 focus:ring-lightBlue focus:ring-offset-2 focus:ring-offset-grey'>
                                  Sign up
                                </button>
                              </Link>
                              <div className='sm:mt-0 sm:ml-3'>
                                <Link to='/login'>
                                  {' '}
                                  <button
                                    type='submit'
                                    className='block w-full rounded-md bg-lightBlue h-12  font-medium text-white focus:outline-none hover:bg-opacity-80 hover:scale-105 transition ease-in-out delay-55 focus:ring-2 focus:ring-lightBlue focus:ring-offset-2 focus:ring-offset-grey'
                                  >
                                    Log in
                                  </button>
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className='flex flex-col items-center mt-8 space-x-3 gap-2'>
                          {/* <div className='text-base font-medium text-white opacity-50 '>
                            Built by Darius Garcia
                          </div> */}
                          <span className='w-full bg-neutral opacity-30 h-1'></span>
                          <section className='flex flex-col h-full'>
                            <p className='text-white text-sm letter mt-6'>
                              "Fmp Cloud is composed of a team of dedicated
                              engineers, financial analysts, accountants and
                              data analysts to provide you the best data
                              possible. Through our years of research and
                              expertise we have developed this financial API for
                              anyone to access financials data to perform
                              outstanding analysis and have the best investments
                              tool to improve their stock picking strategy and
                              portfolio creation"
                            </p>
                            <a
                              className='h-full flex justify-end md:pr-2 w-full text-blue text-sm hover:opacity-80'
                              href='https://fmpcloud.io/'
                            >
                              - Fmp Cloud API
                            </a>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0'>
                    <div className='mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0'>
                      {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                      <img
                        className='w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none'
                        src='https://tailwindui.com/img/component-images/cloud-illustration-teal-cyan.svg'
                        alt=''
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='relative overflow-hidden flex flex-col md:flex-col justify-center w-full items-center text-white bg-primary md:pt-16 pb-32'>
              <div className='relative md:mx-16 sm:mx-0 lg:w-3/5'>
                <div className='lg:mx-auto flex flex-col md:flex-row lg:px-8'>
                  <div className='mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0'>
                    <div>
                      <div>
                        <span className='flex h-12 w-12 items-center justify-center rounded-md bg-indigo-600'></span>
                      </div>
                      <div className=''>
                        <h2 className='text-3xl font-bold tracking-tight'>
                          Stay on top of your favorite stocks
                        </h2>
                        <p className='mt-4 text-lg opacity-70'>
                          Create an account and log in from your phone or laptop
                          device for free! View live stats and metrics about any
                          stock, such as P/E ratio, average volume, and more.
                        </p>
                        <p className='mt-4 text-lg text-gray-500'></p>
                        <div className='mt-6'>
                          <Link to={user ? '/dashboard' : '/login'}>
                            <h3 className='inline-flex flex-row  justify-center items-center gap-4 rounded-md border-2 border-lightBlue hover:bg-lightBlue  px-16 py-2 text-base font-medium text-white shadow-sm  hover:scale-105 transition ease-in-out delay-55'>
                              Get started{' '}
                              <BsArrowRightSquare
                                size={20}
                              ></BsArrowRightSquare>
                            </h3>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='mt-8 border-t pt-6'>
                      <blockquote className='opacity-80'>
                        <div>
                          <p className='text-base text-gray-500'>
                            Thank you for checking out my project!
                          </p>
                        </div>
                      </blockquote>
                    </div>
                  </div>
                  <div className='mt-12 sm:mt-16 lg:mt-0'>
                    <div className='pl-4 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0'>
                      <img
                        className='w-full md:min-w-[500px] lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none'
                        src={screenshot}
                        alt='Inbox user interface'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='md:mt-24'>
                <div className='lg:mx-auto flex  items-center flex-col md:flex-row-reverse  lg:gap-24 lg:px-8'>
                  <div className='mx-auto max-w-xl px-4 sm:px-6 flex flex-row lg:mx-0 lg:max-w-none lg:py-32 lg:px-0'>
                    <div>
                      <div>
                        <span className='flex h-12 w-12 items-center justify-center rounded-md bg-indigo-600'></span>
                      </div>
                      <div className='md:mt-6'>
                        <h2 className='text-3xl font-bold tracking-tight'>
                          Gain a Better Understanding
                        </h2>
                        <p className='mt-4 text-lg opacity-60'>
                          Read up to date news articles about your favorite
                          stocks. Browse broad market data on different market
                          indexes.
                        </p>
                        <div className='mt-6'>
                          <a
                            href='/market'
                            className='inline-flex rounded-md border border-transparent bg-grey3 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lightBlue'
                          >
                            View Stock News
                          </a>
                          <img
                            className='hidden md:flex mt-12 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none'
                            src={market}
                            alt='Customer profile user interface'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='sm:mt-16 lg:col-start-1 lg:mt-0'>
                    <div className=' md:pr-4 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0'>
                      <img
                        className=' mt-12 rounded-xl md:h-[800px]  md:w-full lg:absolute lg:right-0 lg:max-w-none'
                        src={gif}
                        alt='Customer profile user interface'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
