import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { buttonText } from '../../constants';
import { userLogout } from '../../store/user/actionCreators';
import { getUser } from '../../selectors';

import './Header.css';

function Header() {
	const token = localStorage.getItem('token');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { name } = useSelector(getUser);

	const logout = () => {
		localStorage.setItem('token', '');
		dispatch(userLogout());
		navigate('/login');
	};
	return (
		<div className='header'>
			<Logo />
			<div>
				<span className='name'>{name}</span>
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
