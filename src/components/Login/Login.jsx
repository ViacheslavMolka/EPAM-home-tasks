import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { userLogin } from '../../store/user/actionCreators';

import './Login.css';

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, setLogin] = React.useState({
		email: '',
		password: '',
	});
	const handleChange = (e) => {
		setLogin({
			...login,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch('http://localhost:3000/login', {
			method: 'POST',
			body: JSON.stringify(login),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		if (result.successful) {
			dispatch(userLogin({ ...result.user, token: result.result }));
			localStorage.setItem('token', result.result);
			navigate('/courses');
		} else alert(result.result);
	};
	return (
		<form onSubmit={onSubmit} className='loginForm'>
			<span>Login</span>
			<Input
				placeholderText='Enter email'
				inputName='email'
				labelText='Email'
				width='24%'
				value={login.email}
				onChange={handleChange}
			/>
			<Input
				placeholderText='Enter password'
				inputName='password'
				labelText='Password'
				type='password'
				width='24%'
				value={login.password}
				onChange={handleChange}
			/>
			<Button buttonText='Login' type='submit' />
			<span>
				If you not have an account you can{' '}
				<Link to='/registration/'>Registration</Link>
			</span>
		</form>
	);
}

export default Login;
