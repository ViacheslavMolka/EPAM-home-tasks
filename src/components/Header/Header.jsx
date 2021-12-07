import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { buttonText } from '../../constants';

import './Header.css';

function Header({ userName }) {
	const token = localStorage.getItem('token');
	const navigate = useNavigate();
	const logout = () => {
		localStorage.setItem('token', '');
		navigate('/login');
	};
	return (
		<div className='header'>
			<Logo />
			<div>
				<span>{userName}</span>
				{token ? (
					<Button buttonText={buttonText.logout} onClick={logout} />
				) : (
					<Link to='/login'>
						<Button buttonText={buttonText.login} />
					</Link>
				)}
			</div>
		</div>
	);
}

export default Header;
