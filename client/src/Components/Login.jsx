import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import validator from 'validator';
import { regexPassword } from '../utils';

export default function Login({}) {
	const [values, setValues] = useState({
		email: '',
		password: '',
		showPassword: false,
	});
	const [errors, setErrors] = useState({
		email: false,
		password: false,
		fetchError: false,
		fetchErrorMsg: '',
	});

	const handleChange = (fieldName) => (event) => {
		const currValue = event.target.value;
		let isCorrectValue =
			fieldName === 'email'
				? validator.isEmail(currValue)
				: regexPassword.test(currValue);

		isCorrectValue
			? setErrors({ ...errors, [fieldName]: false })
			: setErrors({ ...errors, [fieldName]: true });

		setValues({ ...values, [fieldName]: event.target.value });
	};

	const handleShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const res = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: values.email,
					password: values.password,
				}),
			});

			if (!res.ok) {
				const error = await res.json();
				return setErrors({
					...errors,
					fetchError: true,
					fetchErrorMsg: error.msg,
				});
			}

			const data = await res.json();
			console.log({ data });

			// this is just a visual feedback for user for this demo
			// this will not be an error, rather we will show a different UI or redirect user to dashboard
			setErrors({
				...errors,
				fetchError: true,
				fetchErrorMsg: data.msg,
			});
			setValues({
				email: '',
				password: '',
				showPassword: false,
			});
			return;
		} catch (error) {
			setErrors({
				...errors,
				fetchError: true,
				fetchErrorMsg:
					'There was a problem with our server, please try again later',
			});
		}
	};

	return (
		<div className='absolute flex justify-center w-screen mt-8 h-screen'>
			<form
				onSubmit={handleSubmit}
				noValidate
				className='flex flex-col justify-start w-5/6 md:w-1/2 items-center h-full bg-grey rounded-lg text-white'>
				<h1 className='p-12 md:p-24 text-xl md:text-2xl'>
					Login To Your Account
				</h1>
				<label className=''>Email</label>
				<input
					type='email'
					value={values.email}
					onChange={handleChange('email')}
					error={errors.email}
					className='my-2 w-64 h-10 pl-1 text-black'></input>
				<label className='my-2 '>Password</label>
				<input
					type={values.showPassword ? 'text' : 'password'}
					value={values.password}
					onChange={handleChange('password')}
					error={errors.password}
					className='my-2 w-64 h-10 pl-1 text-black'
					placeholder=''></input>
				<button onClick={() => handleShowPassword('showPassword')}>
					{values.showPassword ? '+' : '-'}
				</button>
				<button
					className='w-64 h-10 bg-lightBlue rounded-lg hover:bg-darkBlue hover:'
					type='submit'
					onClick={handleSubmit}
					disabled={errors.email || errors.password}>
					Login{' '}
				</button>
				<p>Don't have an account yet?</p>
				{/* <link component={RouterLink} to='/signup'>
					Sign up here
				</link> */}
			</form>
			<div className='flex items-center justify-center mt-6'></div>
		</div>
	);
}
