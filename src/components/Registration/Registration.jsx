import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { buttonText } from '../../constants';

import './Registration.css';

function Registration() {
	const navigate = useNavigate();
	const [registration, setRegistration] = React.useState({
		name: '',
		email: '',
		password: '',
	});
	const handleChange = (e) => {
		setRegistration({
			...registration,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch('http://localhost:3000/register', {
			method: 'POST',
			body: JSON.stringify(registration),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		if (result.successful) {
			navigate('/login/');
		} else {
			const errorLine = result.errors && result.errors.join(', ');
			alert(errorLine);
		}
	};
	return (
		<form onSubmit={onSubmit} className='registration'>
			<span>Registration</span>
			<Input
				placeholderText='Enter name'
				inputName='name'
				labelText='Name'
				width='24%'
				value={registration.name}
				onChange={handleChange}
			/>
			<Input
				placeholderText='Enter email'
				inputName='email'
				labelText='Email'
				width='24%'
				value={registration.email}
				onChange={handleChange}
			/>
			<Input
				placeholderText='Enter password'
				inputName='password'
				labelText='Password'
				type='password'
				width='24%'
				value={registration.password}
				onChange={handleChange}
			/>
			<Button buttonText={buttonText.registration} type='submit' />
			<span>
				If you have an account you can <Link to='/login/'>Login</Link>
			</span>
		</form>
	);
}

export default Registration;
