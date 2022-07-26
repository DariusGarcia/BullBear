import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import validator from 'validator';
import { regexPassword } from '../utils';

export default function Signup() {
	const [values, setValues] = useState({
		email: '',
		password: '',
		repeatPassword: '',
		showPassword: false,
		showRepeatPassword: false,
	});
	const [errors, setErrors] = useState({
		email: false,
		password: false,
		repeatPassword: false,
		fetchError: false,
		fetchErrorMsg: '',
	});

	const handleChange = (fieldName) => (event) => {
		const currValue = event.target.value;
		switch (fieldName) {
			case 'email':
				validator.isEmail(currValue)
					? setErrors({ ...errors, email: false })
					: setErrors({ ...errors, email: true });
				break;

			case 'password':
				regexPassword.test(currValue)
					? setErrors({ ...errors, password: false })
					: setErrors({ ...errors, password: true });
				break;

			case 'repeatPassword':
				currValue === values.password
					? setErrors({ ...errors, repeatPassword: false })
					: setErrors({ ...errors, repeatPassword: true });
				break;
		}
		setValues({ ...values, [fieldName]: event.target.value });
	};

	const handleShowPassword = (showPasswordField) => {
		setValues({
			...values,
			[showPasswordField]: !values[showPasswordField],
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const res = await fetch('/api/register', {
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
			// this is just a visual feedback for user for this demo
			// this will not be an error, rather we will show a different UI or redirect user to dashboard
			// ideally we also want a way to confirm their email or identity
			setErrors({
				...errors,
				fetchError: true,
				fetchErrorMsg: data.msg,
			});
			setValues({
				email: '',
				password: '',
				repeatPassword: '',
				showPassword: false,
				showRepeatPassword: false,
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
		<>
			<div className='absolute flex justify-center w-screen mt-8 h-4/5'>
				<form
					onSubmit={handleSubmit}
					noValidate
					className='flex flex-col justify-start w-5/6 md:w-1/2 items-center h-full bg-grey rounded-lg text-white'>
					<h1 className='p-12 md:p-24 text-xl md:text-2xl'>
						Register a new account
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
					<input
						placeholder='repeat password'
						type={values.showRepeatPassword ? 'text' : 'password'}
						value={values.repeatPassword}
						onChange={handleChange('repeatPassword')}></input>
					<button onClick={() => handleShowPassword('showRepeatedPassword')}>
						{values.showRepeatedPassword ? '+' : '-'}
					</button>
					{errors.repeatPassword && (
						<p error={errors.repeatPassword}>
							Password must be the same as above
						</p>
					)}
					<button
						className='w-64 h-10 bg-lightBlue rounded-lg hover:bg-darkBlue hover:'
						type='submit'>
						Sign me up!{' '}
					</button>
					<p>Don't have an account yet?</p>
					{/* <link component={RouterLink} to='/signup'>
						Sign up here
					</link> */}
				</form>
			</div>
			<div class='flex items-center justify-center mt-6'></div>
		</>
	);
}
