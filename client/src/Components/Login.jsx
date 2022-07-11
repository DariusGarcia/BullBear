import React from 'react';

export default function Login() {
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<div className='absolute flex justify-center w-screen mt-8 h-4/5'>
			<form className='flex flex-col justify-start w-5/6 md:w-1/2 items-center h-full bg-grey rounded-lg text-white'>
				<h1 className='p-12 md:p-24 text-xl md:text-2xl'>
					Please log in or sign up
				</h1>
				<label className=''>Username</label>
				<input
					className='my-2 w-64 h-10 pl-1 text-black'
					placeholder=''></input>
				<label className='my-2 '>Password</label>
				<input
					className='mb-6 w-64 h-10 pl-1 text-black'
					placeholder=''></input>
				<button
					onSubmit={handleSubmit}
					className='w-64 h-10 bg-lightBlue rounded-lg hover:bg-darkBlue hover:'
					type='submit'>
					Sign In{' '}
				</button>
			</form>
		</div>
	);
}
