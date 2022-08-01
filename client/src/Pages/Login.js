import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import validator from 'validator'
import { regexPassword } from '../utils'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		console.log(email, password)
	}
	return (
		<div className='w-full '>
			<div className='my-12 md:my-32  flex justify-center w-full  md:py-12 '>
				{' '}
				<form
					className='flex flex-col justify-center w-full md:w-3/5 bg-neutral rounded-md p-2'
					onSubmit={handleSubmit}>
					<div className='flex justify-center'>
						<h3 className='text-2xl font-bold my-4 border-b-2 border-black pb-2 w-max hover:text-darkBlue'>
							Login
						</h3>
					</div>

					<label className=''>Email:</label>
					<input
						className='outline-black outline-2 border-2 border-black rounded-md mb-4 h-10 pl-2'
						type='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<label className=''>Password:</label>
					<input
						className='outline-black outline-2 border-2 border-black rounded-md h-10 pl-2'
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
					<div className='flex justify-center my-8 w-full'>
						<button
							className='flex justify-center w-32 p-5  text-white rounded-md   bg-darkBlue hover:bg-lightBlue'
							type='submit'>
							{' '}
							Login{' '}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
