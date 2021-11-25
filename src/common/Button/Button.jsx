import React from 'react';

import './Button.css';

export const Button = ({
	buttonText,
	onClick,
	type = 'button',
	disabled = false,
}) => (
	<button disabled={disabled} type={type} className='button' onClick={onClick}>
		{buttonText}
	</button>
);
