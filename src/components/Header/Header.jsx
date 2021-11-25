import React from 'react';

import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import './Header.css';

function Header({ userName }) {
	return (
		<div className='header'>
			<Logo />
			<div>
				<span>{userName}</span>
				<Button buttonText='logout' onClick={() => {}} />
			</div>
		</div>
	);
}

export default Header;
